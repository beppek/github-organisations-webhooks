const restify = require("restify");
const bodyParser = require("body-parser");
const fs = require("fs");
const Router = require("./routes/Router");

function respond(req, res, next) {
  res.send("hello " + req.params.name);
  next();
}

const config =  {
    // key: fs.readFileSync("./secrets/key.pem"),
    // certificate: fs.readFileSync("./secrets/cert.pem"),
    name: "Github Organisation Subscription API"
};

const api = restify.createServer(config);
api.use(restify.CORS({
  origins: ["*"],
  headers: ["x-authorization", "x-uid"]
}));
restify.CORS.ALLOW_HEADERS.push("x-authorization");
restify.CORS.ALLOW_HEADERS.push("x-uid");

api.use(restify.fullResponse());
api.use(bodyParser.json());

let router = new Router();
router.route(api);

api.listen(4567, () => {
  console.log("%s listening at %s", api.name, api.url);
});