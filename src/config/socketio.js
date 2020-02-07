let configSocketIo = () => {
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: session.sesstionStore,
    success: (data, accept) => {
      if (!data.user.logged_in) {
        return accept("Invalid", false);
      }
      return accept(null, true);
    },
    fail: (data, message, error, accept) => {
      if(error) {
        console.log("fail to connect to socketio", message);
        return accept(new Error(message), false);;
      }
    }
  }));
};

module.exports = configSocketIo;
