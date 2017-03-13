import firebase from "../Interfaces/Firebase";

module.exports = function() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("sw and push is supported");
      register();
    } else {
      console.log("Tech not supported. Drop the apple and step into the future.");
    }
};

function register() {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("firebase-messaging-sw.js").then(function(reg) {
      requestPermission();
      getMessageToken();
      listenForUpdates(reg);
      onTokenRefresh();

      checkStatus(reg);

      console.log("ServiceWorker registration successful with scope: ", reg.scope);

      }).catch(function(err) {
          console.log("ServiceWorker registration failed: ", err);
      });
    });
}

function requestPermission() {
    firebase.requestPermission().then(() => {
        console.log("permission granted");
    })
    .catch((error) => {
        console.log("unable to get permission", error);
    });
}

function getMessageToken() {
    firebase.getMsgToken().then((token) => {
        console.log(token);
    })
    .catch((error) => {
        if (error) {
            console.log(error);
        } else {
            firebase.requestPermission();
        }
    });
}

function listenForUpdates(reg) {
    reg.addEventListener("updatefound", function() {
        console.log("installing update");
    });
}

function onTokenRefresh() {
    firebase.onTokenRefresh((error, token) => {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log(token);
            return;
        }
    });
}

function checkStatus(reg) {
    if (reg.installing) {
          console.log("installing");
          return;
      }

      if (reg.waiting) {
          console.log("waiting");
          return;
      }

      if (!navigator.serviceWorker.controller) {
          console.log("no controller");
          return;
      }
}