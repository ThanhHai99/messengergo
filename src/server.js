import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";
import configViewEngine from "./config/viewEngine";

//Init app
const app = express();

//Connect to DB
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
