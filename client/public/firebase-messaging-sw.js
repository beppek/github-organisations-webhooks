importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js");

firebase.initializeApp({
  "messagingSenderId": "230580723467"
});

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    var title = payload.title;
    var options = {payload};
    return self.registration.showNotification(title, options);
});