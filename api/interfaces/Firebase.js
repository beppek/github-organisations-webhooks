const firebase = require("firebase-admin");

class Firebase {

    handleEvent(data) {
        let promises = [];
        promises.push(new Promise((resolve, reject) => {
            this.saveToDB("events", data).then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        }));
        return Promise.all(promises).then(function() {
            return Promise.resolve();
        });
    }

    saveToDB(collection, data) {
        return new Promise((resolve, reject) => {
            console.log(data);
        });
    }

}

const iFirebase = new Firebase();
module.exports = iFirebase;