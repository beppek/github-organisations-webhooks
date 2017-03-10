"use strict";
const Request = require("superagent");
const url = "https://api.github.com/";
const payloadUrl = "https://us-central1-beppek-github-webhooks.cloudfunctions.net/githubPayload";

class Github {

    getOrgs(token) {
        return new Promise((resolve, reject) => {
            Request
                .get(`${url}user/orgs`)
                .set({ "Authorization": `token ${token}` })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getHooks(org, token) {
        return new Promise((resolve, reject) => {
            Request
                .get(`${url}orgs/${org}/hooks`)
                .set({ "Authorization": `token ${token}` })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    createHook(org, token, events) {
        return new Promise((resolve, reject) => {
            let config = {
                url: payloadUrl,
                content_type: "json"
            };
            Request
                .post(`${url}orgs/${org}/hooks`)
                .send({name: "web", active: true, config: config, events: events})
                .set({ "Authorization": `token ${token}` })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    deleteHook(org, id, token) {
        return new Promise((resolve, reject) => {
            Request
                .del(`${url}orgs/${org}/hooks/${id}`)
                .set({ "Authorization": `token ${token}` })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}

const github = new Github();
module.exports = github;