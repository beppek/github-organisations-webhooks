"use strict";
const github = require("../interfaces/Github");
const firebase = require("../interfaces/Firebase");

/**
 * Github Routes
 * Listens to github webhooks
 * Sends data to firebase
 */
module.exports = function(api) {

    /**
     * GET /github
     */
     api.get({path: "/github/orgs"}, (req, res, next) => {
        github.getOrgs(req.headers["x-authorization"]).then((data) => {
            res.send(200, data);
            next();
        })
        .catch((error) => {
            res.send(500, error);
        });
     });

    api.get({path: "/github/orgs/webhooks"}, (req, res, next) => {

    });

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