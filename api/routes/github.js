"use strict";
const iFirebase = require("../interfaces/Firebase");

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
        iFirebase.handleEvent(data).then(() => {
            res.send(204);
            return next();
        })
        .catch((error) => {
            res.send(500);
            return next();
        });
    });

};