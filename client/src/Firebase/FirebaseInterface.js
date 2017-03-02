const firebase = require("firebase");
const firebaseConfig = require("./config");

class FirebaseInterface {

    init() {
        firebase.initializeApp(firebaseConfig);
    }

    authenticate() {
        let provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("user repo admin:org_hook");
        firebase.auth().signInWithRedirect(provider);
    }

    getRedirectResult() {
        return new Promise((resolve, reject) => {
            firebase.auth().getRedirectResult().then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }


}

export default FirebaseInterface;