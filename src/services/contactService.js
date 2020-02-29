import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import NotificationModel from "./../models/notificationModel";
import _ from "lodash";

let findUsersContact = (currentUserId, keyword) => {
	return new Promise(async (resolve, reject) => {
		let deprecateUserIds = [currentUserId];
		let contactsByUser = await ContactModel.findAllByUser(currentUserId);
		contactsByUser.forEach((contact) => {
			deprecateUserIds.push(contact.userId);
			deprecateUserIds.push(contact.contactId);
		});

		deprecateUserIds = _.uniqBy(deprecateUserIds);
		let users = await UserModel.findAllForAddContact(deprecateUserIds, keyword);
		resolve(users);
	})
};

let addNew = (currentUserId, contactId) => {
	return new Promise(async (resolve, reject) => {
		let contactExists = await ContactModel.checkExists(currentUserId, contactId);
		if(contactExists){
			return reject(false);
		}

		//Create contact
		let newContactItem = {
			userId: currentUserId,
			contactId: contactId
		};

		//Create notification
		let notificationItem = {
			senderId: currentUserId,
			receiverId: contactId,
			type: NotificationModel.types.ADD_CONTACT
		};
		await NotificationModel.model.createNew(notificationItem);

		let newContact = await ContactModel.createNew(newContactItem);
		resolve(newContact);
	});
};

let removeRequestContact = (currentUserId, contactId) => {
	return new Promise(async (resolve, reject) => {
		let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId);
		if(removeReq.result.n === 0 ) {
			return reject(false);
		}
		//remove notification
		await NotificationModel.model.removeRequestContactNotification(currentUserId, contactId, NotificationModel.types.ADD_CONTACT);
		resolve(true);
	});
};

module.exports = {
	findUsersContact, addNew, removeRequestContact
};
