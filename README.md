# App
A simple Github Organisation subscription app that makes calls to the github api and stores the data in firebase. Optimised and built for mobile. Save to homescreen to get native-like feel.

## Getting started
The app is deployed at: https://beppek-github-webhooks.firebaseapp.com

Start by logging in with your Github account. Next find an organisation where you are admin and create a hook. Alternatively find an organisation where admin has already created a hook within the app.

You can now select which events will trigger notifications for each organisation. At the moment the possible events are: Pull Request, Push, Release, Watch, Wiki Event (gollum), Issues and Fork.

Your events will show up in the home page's feed.

## Service worker
The app uses a service worker and will ask for permission to push notifications in the browser. To get push notifications when you are not in the app you will need to accept. The service worker will cache the static files but can not cache the content requested from Firebase or Github.