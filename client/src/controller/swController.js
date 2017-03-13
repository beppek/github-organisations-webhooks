import firebase from "../Interfaces/Firebase";

module.exports = {
  register: register,
  requestPermission: requestPermission
};

function register() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("sw and push is supported");
      window.addEventListener("load", function() {
          navigator.serviceWorker.register("/service-worker.js").then(function(reg) {
          // navigator.serviceWorker.register("/firebase-messaging-sw.js").then(function(reg) {
          // requestPermission();
          listenForUpdates(reg);
          onTokenRefresh();

          checkStatus(reg);

          console.log("ServiceWorker registration successful with scope: ", reg.scope);

        }).catch(function(err) {
            console.log("ServiceWorker registration failed: ", err);
            console.log(err);
        });
      });
    } else {
      console.log("Tech not supported. Drop the apple and step into the future.");
    }
}

function requestPermission() {
    firebase.requestPermission().then(() => {
        console.log("permission granted");
        return getMessageToken();
    })
    .catch((error) => {
        console.log("unable to get permission", error);
    });
}

function getMessageToken() {
    firebase.getMsgToken().then((token) => {
      let uid = localStorage.getItem("uid");
      console.log(uid);
      if (uid !== null) {
        firebase.saveIfNotExists(`users/${uid}/notificationTokens/${token}`, true);
        console.log(token);
      }
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