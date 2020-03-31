import {notification, contact, message} from "./../services/index";
import {bufferToBase64, lastItemOfArray, convertTimestampToHumanTime} from "./../helpers/clientHelper";
import request from "request";

let getICETurnServer = () => {
	return new Promise(async (resolve, reject) => {
		// Node Get ICE STUN and TURN list
		let o = {
			format: "urls"
		};

		let bodyString = JSON.stringify(o);

		let options = {
			url: "https://global.xirsys.net/_turn/messengergo",
			// host: "global.xirsys.net",
			// path: "/_turn/messengergo",
			method: "PUT",
			headers: {
					"Authorization": "Basic " + Buffer.from("ThanhHai99:31f9f09e-735e-11ea-ab67-0242ac110004").toString("base64"),
					"Content-Type": "application/json",
					"Content-Length": bodyString.length
			}
		};

		//call a request get ICE list of turn server
		request(options, (error, response, body) => {
			if (error) {
				console.log("Error when get ICE list: " + error);
				return reject(error);
			}
			let bodyJson = JSON.parse(body);
			resolve(bodyJson.v.iceServers);
		});
	});
};

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

	let allConversationWithMessages = getAllConversationItems.allConversationWithMessages;

	//Get ICE list from xirsys turn server
	let iceServerList = await getICETurnServer();

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
		allConversationWithMessages,
		bufferToBase64,
		lastItemOfArray,
		convertTimestampToHumanTime,
		iceServerList: JSON.stringify(iceServerList)
	});
};

module.exports = {
	getHome: getHome
};
