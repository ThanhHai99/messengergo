// import express from "express";
// import ConnectDB from "./config/connectDB";
// import ContactModel from "./model/contact.model"
const express = require("express");
const ConnectDB = require("./config/connectDB");
const configViewEngine = require("./config/viewEngine");

//Init app
let app = express();

//Connect DB
ConnectDB();

//Config view Engine
configViewEngine(app);

app.get("/", (req, res) => {
  res.render("main/master");
});
app.get("/login-register", (req, res) => {
  res.render("auth/loginRegister");
});


app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
