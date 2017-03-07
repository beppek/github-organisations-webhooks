const ping = require("./ping");
const github = require("./github");

class Router {

    route(api) {
        ping(api);
        github(api);
    }

}

module.exports = Router;