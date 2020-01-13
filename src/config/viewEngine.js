const express = require("express");
const expressEjsExtend = require("express-ejs-extend");

/*Config views engine*/
let configViewEngine = app => {
  app.use(express.static("./src/public"));
  app.engine("ejs", expressEjsExtend);
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
