import express from "express";
import { auth, home, user, contact } from "./../controllers/index";
import {initPassportLocal, initPassportGoogle, initPassportFacebook} from "./../controllers/passportController/index";
import { authValid, userValid, contactValid } from "./../validation/index";
import passport from "passport";

//Init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();

/**
 * Init app routes
 * @param app from exactly express module
 */

let configRoutes = (app) => {
	router.get("/login-register", auth.checkLoggedOut, auth.getLoginRegister);
	router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister);
	router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);

	
	router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/login-register",
			successFlash: true,
			failureFlash: true
		}
	));

	router.get("/auth/facebook", auth.checkLoggedOut, passport.authenticate("facebook", { scope: ["email"] }));
	router.get("/auth/facebook/callback", auth.checkLoggedOut, passport.authenticate("facebook", {
			successRedirect: "/",
			failureRedirect: "/login-register",
			successFlash: true,
			failureFlash: true
		}
	));

	router.get("/auth/google", auth.checkLoggedOut, passport.authenticate("google", {scope: ["email"] }));
	router.get("/auth/google/callback", auth.checkLoggedOut, passport.authenticate("google", {
			successRedirect: "/",
			failureRedirect: "/login-register",
			successFlash: true,
			failureFlash: true
		}
	));

	router.get("/", auth.checkLoggedIn, home.getHome);
	router.get("/logout", auth.checkLoggedIn, auth.getLogout);

	router.put("/user/update-avatar", auth.checkLoggedIn, user.updateAvatar);
	router.put("/user/update-info", auth.checkLoggedIn, userValid.updateInfo, user.updateInfo);
	router.put("/user/update-password", auth.checkLoggedIn, userValid.updatePassword, user.updatePassword);

	router.get("/contact/find-users/:keyword", auth.checkLoggedIn, contact.findUsersContact);
	router.post("/contact/add-new", auth.checkLoggedIn, contact.addNew);
	router.delete("/contact/remove-request-contact", auth.checkLoggedIn, contact.removeRequestContact);

	return app.use("/", router);
};

module.exports = configRoutes;
