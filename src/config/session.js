import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

let sessionStore = new MongoStore({
	url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	autoReconnect: true,
	autoRemove: "native"
});

/**
 * Config session for app
 * @param app from exactly express module
 */

let configSession = (app) => {
	app.use(
		session({
			key: "express.sid",
			secret: "mySecrect",
			store: sessionStore,
			resave: true,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 // milisecond = 1 day
			}
		})
	);
};

module.exports = configSession;
