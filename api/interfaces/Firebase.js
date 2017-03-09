const admin = require("firebase-admin");
const serviceAccount = require("../secrets/accountKey");
class Firebase {

    init() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://beppek-github-webhooks.firebaseio.com"
        });
    }

    handleEvent(data) {
        console.log(data);
        let promises = [];
        promises.push(new Promise((resolve, reject) => {
            this.saveToDB("events", data).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        }));
        promises.push(new Promise((resolve, reject) => {
            this.notifySubscribers(data.organization.login).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        }));
        return Promise.all(promises).then(function() {
            return Promise.resolve();
        });
    }

    notifySubscribers(org) {
        return new Promise((resolve, reject) => {
            let subscribersRef = `orgs/${org}/hook/subscribers`;
            const dbRef = admin.database().ref(subscribersRef).once("value").then((snap) => {
                console.log(snap.val());
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    saveToDB(collection, data) {
        console.log("saving event...");
        console.log(collection);
        return new Promise((resolve, reject) => {
            const dbRef = admin.database().ref();
            const newRef = dbRef.child(collection).push();
            newRef.set(data).then((data) => {
                console.log("Event saved!");
                resolve(data);
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