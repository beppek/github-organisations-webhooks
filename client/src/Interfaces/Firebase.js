const firebase = require("firebase");
const firebaseConfig = require("./firebase.config");
const Request = require("superagent");

const url = "https://us-central1-beppek-github-webhooks.cloudfunctions.net/webhook";

class FirebaseInterface {

    init() {
        firebase.initializeApp(firebaseConfig);
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            let provider = new firebase.auth.GithubAuthProvider();
            provider.addScope("user repo admin:org admin:org_hook");
            firebase.auth().signInWithRedirect(provider);
        });
    }

    signout() {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    getRedirectResult() {
        return new Promise((resolve, reject) => {
            firebase.auth().getRedirectResult().then((result) => {
                if (!result.user) {
                    reject("no user");
                }
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    handleLoggedIn(data) {
        return new Promise((resolve, reject) => {
            let userData = {name: data.displayName, avatar: data.photoURL, email: data.email, events: []};
            this.saveIfNotExists(`users/${data.uid}`, userData).then((commited) => {
                resolve(commited);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    addHook(org, data, uid) {
        let promises = [];
        promises.push(new Promise((resolve, reject) => {
            const dbRef = firebase.database().ref(`orgs/${org}/hook`);
            dbRef.set(data).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        }));
        promises.push(new Promise((resolve, reject) => {
            let userSubscription = {events: data.events};
            this.saveIfNotExists(`users/${uid}/subscriptions/${org}`, userSubscription).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        }));
        return Promise.all(promises).then(() => {
            return Promise.resolve();
        });
    }

    saveToDB(collection, data) {
        return new Promise((resolve, reject) => {
            const dbRef = firebase.database().ref();
            const newRef = dbRef.child(collection).push();
            newRef.set(data).then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    getData(ref, callback) {
        let dbRef = firebase.database().ref(ref);
        dbRef.on("value", (snap) => {
            if (snap.val()) {
                callback(snap.val());
            }
        });
    }

    listen(ref, callback) {
        let dbRef = firebase.database().ref(ref);
        dbRef.endAt().limitToLast(1).on("child_added", (snap) => {
            if (snap.val()) {
                callback(snap.key);
            }
        });
    }

    detach(ref) {
        let dbRef = firebase.database().ref(ref);
        dbRef.off();
    }

    getDataOnce(ref) {
        return new Promise((resolve, reject) => {
            let dbRef = firebase.database().ref(ref);
            dbRef.once("value").then((snap) => {
                resolve(snap.val());
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    update(ref, data) {
        return new Promise((resolve, reject) => {
            let dbRef = firebase.database().ref(ref);
            dbRef.set(data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    saveIfNotExists(collection, data) {
        return new Promise((resolve, reject) => {
            const dbRef = firebase.database().ref(collection);
            dbRef.transaction((existing) => {
                if (existing === null) {
                    return data;
                } else {
                    return;
                }
            }, (error, commited)=> {
                if (error) {
                    reject(error);
                } else {
                    resolve(commited);
                }
            });
        });
    }

    deleteRef(ref) {
        return new Promise((resolve, reject) => {
            const dbRef = firebase.database().ref(ref);
            dbRef.remove()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    deleteHook(org, token) {
        return new Promise((resolve, reject) => {
            Request
                .del(`${url}/${org}`)
                .set({ "Authorization": token })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getToken() {
        return new Promise((resolve, reject) => {
            firebase.auth().currentUser.getToken(true).then((token) => {
                resolve(token);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

}
const iFirebase = new FirebaseInterface();
module.exports = iFirebase;