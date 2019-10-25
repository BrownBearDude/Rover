const express = require("express");
let app = express();
app.use(express.static("static"));
app.use(express.static("dist"));
let server = app.listen(80);