import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import _ from "lodash";

const LIMIT_CONVERSATION_TAKEN = 15;

/**
 * get all conversations
 * @param {String} currentUserId 
 */
let getAllConversationItems = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = ContactModel.getContacts(currentUserId, LIMIT_CONVERSATION_TAKEN);
			let userConversationsPromise = contacts.map(async (contact) => {
				if (contact.contactId == currentUserId) {
          let getUserContact = await UserModel.getNormalUserDataById(contact.userId);
          getUserContact.createAt = contact.createAt;
          return getUserContact;
				} else {
          let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
          getUserContact.createAt = contact.createAt;
          return getUserContact;
				}
      });
      let userConversations = await userConversationsPromise;
      let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATION_TAKEN);
      let allConversations = userConversations.concat(groupConversations);
      
      allConversations = _.sortBy(allConversations, (item) => {
        return -item.createAt;
      });

      resolve({
        userConversations,
        groupConversations,
        allConversations
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllConversationItems
};
