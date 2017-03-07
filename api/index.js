const restify = require("restify");
const bodyParser = require("body-parser");
const fs = require("fs");

function respond(req, res, next) {
  res.send("hello " + req.params.name);
  next();
}

const config =  {
    // key: fs.readFileSync("./secrets/key.pem"),
    // certificate: fs.readFileSync("./secrets/cert.pem"),
    name: "Github Organisation Subscription API"
};

const server = restify.createServer(config);
server.use(restify.CORS({
  origins: ["*"],
  headers: ["x-authorization", "x-uid"]
}));
restify.CORS.ALLOW_HEADERS.push('x-authorization');
restify.CORS.ALLOW_HEADERS.push('x-uid');
server.use(restify.fullResponse());
server.use(bodyParser.json());
server.get("/hello/:name", respond);
server.head("/hello/:name", respond);
server.post("/payload", function(req, res, next) {
    console.log(req.headers);
    console.log("Event: " + req.headers["x-github-event"]);
});
server.get("/ping", (req, res, next) => {
  console.log(req.headers);
  let response = {"answer": "pong"};
  res.send(200, response);
  next();
});

server.listen(4567, () => {
  console.log("%s listening at %s", server.name, server.url);
});