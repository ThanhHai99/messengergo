import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";

//Init app
const app = express();

//Connect to DB
ConnectDB();

//Config session
configSession(app);

//Config view Engine
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({urlencoded: true}));

//Enable flash message
app.use(connectFlash());

//Config passport js
app.use(passport.initialize());
app.use(passport.session());

//Inti all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);

/*
import pem from "pem";
import https from "https";

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err;
  }
  //Init app
  const app = express();

  //Connect to DB
  ConnectDB();

  //Config session
  configSession(app);

  //Config view Engine
  configViewEngine(app);

  //Enable post data for request
  app.use(bodyParser.urlencoded({urlencoded: true}));

  //Enable flash message
  app.use(connectFlash());

  //Config passport js
  app.use(passport.initialize());
  app.use(passport.session());

  //Inti all routes
  initRoutes(app);
  
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOST, () =>
    console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);

});
*/
