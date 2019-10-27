// import express from "express";
// import ConnectDB from "./config/connectDB";
// import ContactModel from "./model/contact.model"
const express = require("express");
const ConnectDB = require("./config/connectDB");

const app = express();
ConnectDB();

app.get("/helloworld", (req, res) => res.send("<h1>Hello Thanh Hai !</h1>"));
app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
