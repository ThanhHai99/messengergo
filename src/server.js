// import express from "express";
// import ConnectDB from "./config/connectDB";
// import ContactModel from "./model/contact.model"
const express = require("express");
const ConnectDB = require("./config/connectDB");
const ContactModel = require("./models/contact.model");

let app = express();
ConnectDB();

// source sh/env.sh

app.get("/test-database", async (req, res) => {
  try {
    let item = {
      userId: "thanhhai",
      contactId: "thanhhaiID"
    };
    let contact = await ContactModel.createNew(item);
    res.send(contact);
  } catch (error) {
    console.log(error);
  }
  res.send("<h1>Hello Thanh Hai !</h1>");
});
app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
