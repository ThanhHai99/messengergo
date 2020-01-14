import express from "express";
// import ConnectDB from "./config/connectDB";
// import ContactModel from "./model/contact.model";

//Init app
const app = express();

// //Connect DB
// ConnectDB();

// //Config view Engine
// configViewEngine(app);

app.get("/", (req, res) => {
  res.render("main/master");
});
app.get("/login-register", (req, res) => {
  res.render("auth/loginRegister");
});


app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);

console.log("log", process.env.APP_HOST);
