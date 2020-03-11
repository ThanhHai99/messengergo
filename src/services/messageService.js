import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import MessageModel from "./../models/messageModel";
import _ from "lodash";

const LIMIT_CONVERSATION_TAKEN = 15;
const LIMIT_MESSAGES_TAKEN = 30;

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
          getUserContact.updatedAt = contact.updatedAt;
          return getUserContact;
				} else {
          let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
          getUserContact.updatedAt = contact.updatedAt;
          return getUserContact;
				}
      });
      let userConversations = await userConversationsPromise;
      let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATION_TAKEN);
      let allConversations = userConversations.concat(groupConversations);
      
      allConversations = _.sortBy(allConversations, (item) => {
        return -item.updatedAt;
      });

      let allConversationWithMessagesPromise = allConversations.map(async (conversation) => {
        conversation = conversation.toObject();
        if (conversation.members) {
          let getMessages = await MessageModel.model.getMessagesInGroup(conversation._id, LIMIT_MESSAGES_TAKEN);
          conversation.messages = getMessages;
        } else {
          let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
          conversation.messages = getMessages;
        };
        return conversation;
      });
      //sort by updatedAt desending
      let allConversationWithMessages = await Promise.all(allConversationWithMessagesPromise);
      allConversationWithMessages = _.sortBy(allConversationWithMessages, (item) => {
        return -item.updatedAt;
      });

      resolve({
        userConversations,
        groupConversations,
        allConversations,
        allConversationWithMessages
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllConversationItems
};
