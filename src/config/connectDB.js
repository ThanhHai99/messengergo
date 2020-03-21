import mongoose from "mongoose";
import bluebird from "bluebird";

// Connect to MongoDB
let connectDB = () => {
	mongoose.Promise = bluebird;
	// URI = mongodb://localhost:27017/<DB name>
	// let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
	let URI = `mongodb+srv://thanhhai:thanhhai3303703@cluster0-amayj.mongodb.net/test?retryWrites=true&w=majority`;
	return mongoose.connect(URI, { useMongoClient: true });
};

module.exports = connectDB;
