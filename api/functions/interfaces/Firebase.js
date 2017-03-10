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
            admin.database().ref(subscribersRef).once("value").then((snap) => {

                let subscribers = snap.val();
                subscribers.forEach((subscriber) => {

                    let dbRef = admin.database().ref(`users/${subscriber}`);
                    dbRef.once("value").then((user) => {

                        let subscribedEvents = user.val().subscriptions[org].events;
                        subscribedEvents.forEach((subscribedEvent) => {

                            if (subscribedEvent === eventType) {
                                let eventRef = dbRef.child(`/events/${key}`);
                                eventRef.set({seen: false}).then(() => {
                                    resolve();
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                            }

                        });

                    })
                    .catch((error) => {
                        reject(error);
                    });

                });

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
        let ref = `orgs/${org}/hook`;
        this.getData(ref, (hookRef) => {
            hookRef.subscribers.forEach((sub) => {
                console.log(sub);
                let subRef = `users/${sub}/subscriptions/${org}`;
                this.deleteRef(subRef);
            });
            this.deleteRef(ref);
        });
    }

    deleteRef(ref) {
        return new Promise((resolve, reject) => {
            const dbRef = admin.database().ref(ref);
            dbRef.remove().then(() => {
                console.log(`deleted: ${ref}`);
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    getData(ref, callback) {
        let dbRef = admin.database().ref(ref);
        dbRef.once("value", (snap) => {
            callback(snap.val());
        });
    }

}

const iFirebase = new Firebase();
module.exports = iFirebase;