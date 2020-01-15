import mongoose from "mongoose";
import bluebird from "bluebird";

/* Connect to MongoDB*/
let connectDB = () => {
  mongoose.Promise = bluebird;

  //  mongodb://localhost:27017/<DB name>
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  return mongoose.connect(URI, { useMongoClient: true });
};

module.exports = connectDB;
