import {notification, contact, message} from "./../services/index";
import {bufferToBase64} from "./../helpers/clientHelper";

let getHome = async (req, res) => {
	// Only 10 items one time.
	let notifications = await notification.getNotifications(req.user._id);
	// Get amount notification unread.
	let countNotifUnread = await notification.countNotifUnread(req.user._id);
	
	// Get contacts 10 items one time.
	let contacts = await contact.getContacts(req.user._id);
	// Get contacts send 10 items one time.
	let contactsSent = await contact.getContactsSent(req.user._id);
	// Get contacts received 10 items one time.
	let contactsReceived = await contact.getContactsReceived(req.user._id);
	
	//count contact
	let countAllContacts = await contact.countAllContacts(req.user._id);
	let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
	let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);

	let getAllConversationItems = await message.getAllConversationItems(req.user._id);
	let allConversations = getAllConversationItems.allConversations;
	let userConversations = getAllConversationItems.userConversations;
	let groupConversations = getAllConversationItems.groupConversations;

	let allConversationWithMessages = getAllConversationItems.allConversationWithMessages;

	res.render("main/home/home", {
		errors: req.flash("errors"),
		success: req.flash("success"),
		user: req.user,
		notifications,
		countNotifUnread,
		contacts,
		contactsSent,
		contactsReceived,
		countAllContacts,
		countAllContactsSent,
		countAllContactsReceived,
		allConversations,
		userConversations,
		groupConversations,
		allConversationWithMessages,
		bufferToBase64
	});
};

module.exports = {
	getHome: getHome
};
