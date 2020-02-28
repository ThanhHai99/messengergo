import express from "express";
import ConnectDB from "./config/connectDB";
import session from "./config/session";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import configFlash from "./config/connectFlash";
import passport from "passport";
import configRoutes from "./routes/web";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";

// import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";

import configSocket from "./config/socketio";

//Init app
const app = express();

//Init server with socket.io & express app
let server = http.createServer(app);
let io = socketio(server);

ConnectDB();

session.config(app);

configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({urlencoded: true}))

//Enable flash message
configFlash(app);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

configRoutes(app);

configSocket(io);

initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
