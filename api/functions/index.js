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

exports.sendNotification = functions.database.ref("users/{uid}/events/{eventId}").onWrite(event => {
  const uid = event.params.uid;
  const eventId = event.params.eventId;
  if (!event.data.val()) {
    return;
  }

  if (event.data.val().seen) {
    return console.log("already seen the event");
  }

  const getDeviceTokensPromise = admin.database().ref(`users/${uid}/notificationTokens`).once("value");
  const getEventPromise = admin.database().ref(`events/${eventId}`).once("value");
  return Promise.all([getDeviceTokensPromise, getEventPromise]).then(result => {
    const tokensSnapshot = result[0];
    const eventData = result[1].val();
    if (!tokensSnapshot.hasChildren()) {
      return console.log("There are no notification tokens to send to.");
    }
    console.log("There are", tokensSnapshot.numChildren(), "tokens to send notifications to.");
    console.log("Fetched eventData", eventData);


    const payload = {
      notification: {
        title: `New ${eventData.eventType} event. Action: ${eventData.action}`,
        body: `${eventData.sender.login} triggered the event in ${eventData.organization.login}.`,
        icon: eventData.sender.avatar_url,
        click_action: "https://beppek-github-webhooks.firebaseapp.com/"
      }
    };

    const tokens = Object.keys(tokensSnapshot.val());
    return admin.messaging().sendToDevice(tokens, payload).then(response => {
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error("Failure sending notification to", tokens[index], error);
          if (error.code === "messaging/invalid-registration-token" ||
              error.code === "messaging/registration-token-not-registered") {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });
  });
});