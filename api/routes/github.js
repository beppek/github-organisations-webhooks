"use strict";
const iFirebase = require("../interfaces/Firebase");

/**
 * Github Routes
 * Listens to github webhooks
 * Sends data to firebase
 */
module.exports = (api) => {

    /**
     * POST /github
     */
    api.post({path: "/github/payload"}, (req, res, next) => {
        let data = req.body;
        let eventType = req.headers["x-github-event"];
        iFirebase.handleEvent(data, eventType).then(() => {
            res.send(204);
            return next();
        })
        .catch((error) => {
            res.send(500);
            return next();
        });
    });

    /**
     * DELETE /github
     */
    api.del({path: "/github/webhooks/:org"}, (req, res, next) => {
        iFirebase.deleteWebhook(req.params.org).then(() => {
            res.send(200, {status: "success"});
            return next();
        })
        .catch((error) => {
            res.send(500, {error});
            return next();
        });
    });

};