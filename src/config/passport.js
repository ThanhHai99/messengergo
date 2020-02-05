import passport from "passport";

let configPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configPassport;
