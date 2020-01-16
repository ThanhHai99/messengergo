import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";

//Init app
const app = express();

//Connect to DB
ConnectDB();

//Config view Engine
configViewEngine(app);

//Inti all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
