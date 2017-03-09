"use strict";
const firebase = require("../interfaces/Firebase");

/**
 * Github Routes
 * Listens to github webhooks
 * Sends data to firebase
 */
module.exports = function(api) {

    /**
     * POST /github
     */
    api.post({path: "/github/payload"}, (req, res, next) => {
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

};