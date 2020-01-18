import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";

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

//Inti all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
