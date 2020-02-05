import connectFlash from "connect-flash";
let configFlash = (app) => {
  app.use(connectFlash());
}

module.exports = configFlash;
