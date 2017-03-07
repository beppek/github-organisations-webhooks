const Request = require("superagent");

class Github {

    getOrgs(token) {
        return new Promise((resolve, reject) => {
            Request
                .get("https://api.github.com/user/orgs")
                .set({ "Authorization": `token ${token}` })
                .then((data) => {
                    resolve(JSON.parse(data.text));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getHooks(org, token) {

    }

}

const github = new Github();
module.exports = github;