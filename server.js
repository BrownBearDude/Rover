const express = require("express");
var app = express();
app.use(express.static("client"));
app.use(express.static("dist"));
var server = app.listen(80);