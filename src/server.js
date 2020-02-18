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
// import configSocketIo from "./config/socketio";

import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";

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

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: process.env.SESSION_KEY,
  secret: process.env.SESSION_SECRET,
  store: session.sessionStore,
  success: (data, accept) => {
    if (!data.user.logged_in) {
      return accept("Invalid", false);
    }
    return accept(null, true);
  },
  fail: (data, message, error, accept) => {
    if(error) {
      console.log("fail to connect to socketio", message);
      return accept(new Error(message), false);
    }
  }
}));

initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
