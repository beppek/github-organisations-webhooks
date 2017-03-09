const restify = require("restify");
const bodyParser = require("body-parser");
const fs = require("fs");
const Router = require("./routes/Router");
const firebase = require("./interfaces/Firebase");

const config =  {
    // key: fs.readFileSync("./secrets/key.pem"),
    // certificate: fs.readFileSync("./secrets/cert.pem"),
    name: "Github Organisation Subscription API"
};

const api = restify.createServer(config);
api.use(restify.CORS());
api.use(restify.fullResponse());
api.use(bodyParser.json());

firebase.init();

let router = new Router();
router.route(api);

api.listen(4567, () => {
  console.log("%s listening at %s", api.name, api.url);
});