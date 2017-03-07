const firebase = require("firebase");
const firebaseConfig = require("./firebase.config");

class FirebaseInterface {

    init() {
        firebase.initializeApp(firebaseConfig);
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            let provider = new firebase.auth.GithubAuthProvider();
            provider.addScope("user repo admin:org");
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


}

export default FirebaseInterface;