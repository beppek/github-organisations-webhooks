const firebase = require("firebase");
const firebaseConfig = require("./firebase.config");

class FirebaseInterface {

    init() {
        firebase.initializeApp(firebaseConfig);
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            let provider = new firebase.auth.GithubAuthProvider();
            provider.addScope("user repo admin:org admin:org_hook");
            firebase.auth().signInWithPopup(provider).then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
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

    handleLoggedIn(result) {
        // console.log(result);
    }

    addHook(org, data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            let hookData = {
                events: data.events
            };
            const dbRef = this.database.ref(`orgs/${org}/`);
            const newRef = dbRef.child("hooks").push();
            newRef.set(hookData).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    saveToDB(collection, data) {
        return new Promise((resolve, reject) => {
            const dbRef = firebase.database.ref();
            const newRef = dbRef.child(collection).push();
            newRef.set(data).then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    saveIfNotExists(collection, data) {
        return new Promise((resolve, reject) => {

        });
    }

}

export default FirebaseInterface;