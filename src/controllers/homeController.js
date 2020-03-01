import {notification} from "./../services/index";

let getHome = async (req, res) => {
	// Only 10 items one time.
	let notifications = await notification.getNotifications(req.user._id);
	// Get amount notification unread.
	let countNotifUnread = await notification.countNotifUnread(req.user._id);

	res.render("main/home/home", {
		errors: req.flash("errors"),
		success: req.flash("success"),
		user: req.user,
		notifications: notifications,
		countNotifUnread: countNotifUnread
	});
};

module.exports = {
	getHome: getHome
};
