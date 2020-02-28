import session from "./session";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";

let configSocket = (io) => {
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: session.sessionStore,
    success: (data, accept) => {
      if (!data.user.logged_in) {
        return accept("Invalid user.", false);
      }
      return accept(null, true);
    },
    fail: (data, message, error, accept) => {
      if(error) {
        console.log("Fail to connect to socketio:", message);
        return accept(new Error(message), false);
      }
    }
  }));
};

module.exports = configSocket;
