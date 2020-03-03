import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import NotificationModel from "./../models/notificationModel";
import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 5;

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

let getContacts = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contacts = ContactModel.getContacts(currentUserId, LIMIT_NUMBER_TAKEN);
			let users = contacts.map(async (contact) => {
				if (contact.contactId == currentUserId) {
					return await UserModel.getNormalUserDataById(contact.userId);
				} else {
					return await UserModel.getNormalUserDataById(contact.contactId);
				}
			});
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
};

let getContactsSent = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contacts = ContactModel.getContactsSent(currentUserId, LIMIT_NUMBER_TAKEN);
			let users = contacts.map(async (contact) => {
				return await UserModel.getNormalUserDataById(contact.contactId);
			});
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
};

let getContactsReceived = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let contacts = ContactModel.getContactsReceived(currentUserId, LIMIT_NUMBER_TAKEN);
			let users = contacts.map(async (contact) => {
				return await UserModel.getNormalUserDataById(contact.userId);
			});
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
};

let countAllContacts = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let count = await ContactModel.countAllContacts(currentUserId);
			resolve(count);
		} catch (error) {
			reject(error);
		}
	});
};

let countAllContactsSent = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let count = await ContactModel.countAllContactsSent(currentUserId);
			resolve(count);
		} catch (error) {
			reject(error);
		}
	});
};

let countAllContactsReceived = (currentUserId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let count = await ContactModel.countAllContactsReceived(currentUserId);
			resolve(count);
		} catch (error) {
			reject(error);
		}
	});
};

/**
 * Read more contacts, max 10 items one time.
 * @param {String} currentUserId 
 * @param {Number} skipNumberContatcs 
 */
let readMoreContacts = (currentUserId, skipNumberContatcs) => {
	return new Promise( async (resolve, reject) => {
    try {
      let newContacts = await ContactModel.readMoreContacts(currentUserId, skipNumberContatcs, LIMIT_NUMBER_TAKEN);
      let users = newContacts.map(async(contact) => {
        if (contact.contactId == currentUserId) {
					return await UserModel.getNormalUserDataById(contact.userId);
				} else {
					return await UserModel.getNormalUserDataById(contact.contactId);
				}
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Read more contacts sent, max 10 items one time.
 * @param {String} currentUserId 
 * @param {Number} skipNumberContatcs 
 */
let readMoreContactsSent = (currentUserId, skipNumberContatcs) => {
	return new Promise( async (resolve, reject) => {
    try {
      let newContacts = await ContactModel.readMoreContactsSent(currentUserId, skipNumberContatcs, LIMIT_NUMBER_TAKEN);
			let users = newContacts.map(async(contact) => {
				return await UserModel.getNormalUserDataById(contact.contactId);
			})
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

let readMoreContactsReceived = (currentUserId, skipNumberContatcs) => {
	return new Promise( async (resolve, reject) => {
    try {
      let newContacts = await ContactModel.readMoreContactsReceived(currentUserId, skipNumberContatcs, LIMIT_NUMBER_TAKEN);
			let users = newContacts.map(async(contact) => {
				return await UserModel.getNormalUserDataById(contact.contactId);
			})
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
	findUsersContact,
	addNew,
	removeRequestContact,
	getContacts,
	getContactsSent,
	getContactsReceived,
	countAllContacts,
	countAllContactsSent,
	countAllContactsReceived,
	readMoreContacts,
	readMoreContactsSent,
	readMoreContactsReceived
};
