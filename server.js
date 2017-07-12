var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var app = express();
// Set the app up with morgan, body-parser, and a static folder
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));
// Initialize Firebase
var admin = require("firebase-admin");

var serviceAccount = require("./lets-go-5195d-firebase-adminsdk-3y4n5-5b2aa658d9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lets-go-5195d.firebaseio.com"
});
// Routes
// Simple index route
app.get("/", function(req, res) {
  res.send(index.html);
});
// Listen on port 3000
app.listen(process.env.PORT || 5000);
console.log("listening on port 5000!");