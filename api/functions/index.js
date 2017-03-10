"use strict";
const iFirebase = require("./interfaces/Firebase");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.githubPayload = functions.https.onRequest((req, res) => {
  let eventData = req.body;
  let eventType = req.headers["x-github-event"];
  iFirebase.handleEvent(eventData, eventType).then(() => {
    res.status(204).send();
  })
    .catch((error) => {
      res.status(500).send();
    });

});

exports.webhook = functions.https.onRequest((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  if ("OPTIONS" == req.method) {
    res.send(200);
  }

  let org = req.params[0];

  if (req.headers.authorization && "DELETE" == req.method) {
    let token = req.headers.authorization;
    iFirebase.verifyToken(token).then(() => {
      iFirebase.deleteWebhook(org);
      res.send(204);
    })
    .catch((error) => {
      res.send(403);
    });
  } else {
    res.send(403);
  }

});