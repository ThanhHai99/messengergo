import mongoose from "mongoose";
import bluebird from "bluebird";

// Connect to MongoDB
let connectDB = () => {
	mongoose.Promise = bluebird;
	// let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
	let URI = process.env.MONGO_URI;
	// let client = new MongoClient(URI, { useNewUrlParser: true });
	return mongoose.connect(URI, { useMongoClient: true });
	// return mongoose.connect(URI, { useNewUrlParser: true });
};

module.exports = connectDB;
