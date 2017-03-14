/**
 * Firebase interface for Firebase Cloud Functions
 *
 * @author beppek
 */

const admin = require("firebase-admin");

class Firebase {

    handleEvent(eventData, eventType) {
        eventData.eventType = eventType;
        return new Promise((resolve, reject) => {
            this.saveToDB("events", eventData).then((key) => {
                let org = eventData.organization.login;
                this.notifySubscribers(org, key, eventType).then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    notifySubscribers(org, key, eventType) {
        return new Promise((resolve, reject) => {

            let subscribersRef = `orgs/${org}/hook/subscribers`;
            this.getData(subscribersRef).then((subscribers) => {

                for (var subscriber in subscribers) {

                    let subRef = `users/${subscriber}`;
                    this.getData(subRef).then((user) => {

                        let subscribedEvents = user.subscriptions[org].events;
                        subscribedEvents.forEach((subscribedEvent, i) => {

                            if (subscribedEvent === eventType) {
                                let eventRef = admin.database().ref(subRef).child(`/events/${key}`);
                                eventRef.set({seen: false}).then(() => {
                                    resolve();
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                            } else if (i === subscribedEvents.length -1) {
                                resolve();
                            }

                        });

                    })
                    .catch((error) => {
                        reject(error);
                    });

                }

            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    saveToDB(collection, data) {
        return new Promise((resolve, reject) => {
            const dbRef = admin.database().ref();
            const newRef = dbRef.child(collection).push();
            newRef.set(data).then(() => {
                resolve(newRef.key);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            admin.auth().verifyIdToken(token).then((decoded) => {
                resolve(decoded);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    deleteWebhook(org) {
        let ref = `orgs${org}/hook`;
        this.getData(ref).then((hookRef) => {
            for (var sub in hookRef.subscribers) {
                let subRef = `users/${sub}/subscriptions/${org}`;
                this.deleteRef(subRef);
            }
            this.deleteRef(ref);
        });
    }

    deleteRef(ref) {
        return new Promise((resolve, reject) => {
            const dbRef = admin.database().ref(ref);
            dbRef.remove().then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    getData(ref) {
        return new Promise((resolve, reject) => {
            let dbRef = admin.database().ref(ref);
            dbRef.once("value").then((snap) => {
                resolve(snap.val());
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

}

const iFirebase = new Firebase();
module.exports = iFirebase;