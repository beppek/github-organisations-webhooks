const FirebaseInterface = require("../firebase/FirebaseInterface");
const firebase = new FirebaseInterface();

/**
 * Github Routes
 * Listens to github webhooks
 * Sends data to firebase
 */
class Github {

    constructor(server) {
        this.server = server;
    }

    route() {
        this.post(this.server);
    }

    /**
     * POST /github
     */
    post(server) {
        /**
         * /github/payload
         */
        server.post({path: "/github/payload"}, (req, res, next) => {
            let data = req.body;
            firebase.saveToDB("/events", data).then(() => {
                res.send(200);
                return next();
            })
            .catch((error) => {
                res.send(500);
                return next();
            });
        });
    }

}
module.exports = Github;