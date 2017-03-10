const admin = require("firebase-admin");
const serviceAccount = require("../secrets/accountKey");

class Firebase {

    init() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://beppek-github-webhooks.firebaseio.com"
        });
    }

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
        console.log("saving event...");
        return new Promise((resolve, reject) => {
            const dbRef = admin.database().ref();
            const newRef = dbRef.child(collection).push();
            newRef.set(data).then(() => {
                console.log("Event saved!");
                resolve(newRef.key);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

}

const iFirebase = new Firebase();
module.exports = iFirebase;