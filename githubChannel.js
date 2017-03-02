/**
 * Opens regular http channel for ngrok to communicate with
 * due to limitations with TLS tunnels in free version
 * */
const Router = require("./routes/Github");
const restify = require("restify");
const bodyParser = require("body-parser");

function githubChannel() {
    const githubConfig = {name: "Github Channel"};
    const githubChannel = restify.createServer(githubConfig);
    githubChannel.use(bodyParser.json());
    const router = new Router(githubChannel);
    router.route();
    githubChannel.listen(4567, () => {
        console.log(`${githubChannel.name} listening on port 4567`);
    });
}

module.exports = githubChannel;