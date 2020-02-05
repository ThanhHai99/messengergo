import bodyParser from "body-parser";

let configBodyParser = (app) => {
  app.use(bodyParser.urlencoded({urlencoded: true}));
}

module.exports = configBodyParser;
