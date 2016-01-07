var express = require("express");
var isDev = process.env.NODE_ENV !== "production";

var PORT = isDev ?
  process.env.PORT || 80 :
  process.env.PORT || 3000;

var app = express()
  .use(require("body-parser").urlencoded({
    extended: true,
  }))
  .use(require("body-parser").json())
  .use(require("compression")())
  .use(express.static("server/public"))
  .use(express.static(isDev ? ".tmp/development/public" : ".tmp/production/public"));

var server = app.listen(PORT, "0.0.0.0", function () {
  var url = "http://" + require("os").hostname() + ":" + server.address().port + "/";
  console.log("Server listening at " + url);
});
