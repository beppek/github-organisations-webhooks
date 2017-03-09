module.exports = (api) => {
    api.get("/ping", (req, res, next) => {
        console.log(req.headers);
        let response = {"answer": "pong"};
        res.send(200, response);
        next();
    });
};