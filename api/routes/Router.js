const ping = require("./ping");
const github = require("./github");

class Router {

    constructor() {

    }

    route(api) {
        ping(api);
    }

}

export default Router;