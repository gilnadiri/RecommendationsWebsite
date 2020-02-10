var express = require('express');
var app = express();
var DButilsAzure = require('./DButils');
app.use(express.json());
const jwt = require("jsonwebtoken");
secret = "gil&hodaya";

const users = require('./users');;
const poi = require('./poi');

var cors=require('cors')


app.use(cors())
app.options('*',cors())


app.use("/private", function(req, res,next){
    const token = req.header("x-auth-token");
    if (!token) res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token, secret);
        req.decoded = decoded;
        next(); 
        } catch (exception) {
        res.status(400).send("Invalid token.");
    }
});

app.use("/private/users", users);
app.use("/users", users);
app.use("/private/poi", poi);
app.use("/poi", poi);






var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});














