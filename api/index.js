const restify = require("restify");
const bodyParser = require("body-parser");

function respond(req, res, next) {
  res.send("hello " + req.params.name);
  next();
}

const config =  {
    name: "Github Organisation Subscription API"
};

const server = restify.createServer(config);
server.use(bodyParser.json());
server.get("/hello/:name", respond);
server.head("/hello/:name", respond);
server.post("/payload", function(req, res, next) {
    // console.log(req.body);
    console.log(req.body.action);
});

server.listen(4567, function() {
  console.log("%s listening at %s", server.name, server.url);
});