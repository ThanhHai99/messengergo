import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

let sessionStore = new MongoStore({
	// url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	// url: `mongodb+srv://thanhhai:thanhhai3303703@cluster0-amayj.mongodb.net/test?retryWrites=true&w=majority`,
	url: process.env.DB_URI,
	autoReconnect: true,
	autoRemove: "native"
});

/**
 * Config session for app
 * @param app from exactly express module
 */

let config = (app) => {
	app.use(
		session({
			key: process.env.SESSION_KEY,
  		secret: process.env.SESSION_SECRET,
			store: sessionStore,
			resave: true,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 12 // milisecond = 12 hours
			}
		})
	);
};

module.exports = {
	config,
	sessionStore
};
