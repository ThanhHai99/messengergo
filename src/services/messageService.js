import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import MessageModel from "./../models/messageModel";
import _ from "lodash";
import {transErrors} from "./../../lang/vi";
import app from "./../config/app";

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
          conversation.messages = _.reverse(getMessages);
        } else {
          let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
          conversation.messages = _.reverse(getMessages);
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

/**
 * Add new text and emoji
 * @param {Object} sender currentUser
 * @param {String} receiverId id of a user or a group
 * @param {String} messageVal 
 * @param {Boolean} isChatGroup 
 */
let addNewTextEmoji = (sender, receiverId, messageVal, isChatGroup) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isChatGroup) {
        let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
        if (!getChatGroupReceiver) {
          return reject(transErrors.conversation_not_found);
        }
        let receiver = {
          id: getChatGroupReceiver._id,
          name: getChatGroupReceiver.name,
          avatar: app.general_avatar_group_chat
        };

        let newMessageItem = {
          senderId: sender.id,
          receiverId: receiver.id,
          conversationType: MessageModel.conversationTypes.GROUP,
          messageType: MessageModel.messageTypes.TEXT,
          sender: sender,
          receiver: receiver,
          text: messageVal,
          createdAt: Date.now()
        };
        // create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        // update group chat
        await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
        resolve(newMessage);
      } else {
          let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
          if (!getUserReceiver) {
            return reject(transErrors.conversation_not_found);
          }
          let receiver = {
            id: getUserReceiver._id,
            name: getUserReceiver.username,
            avatar: app.general_avatar_group_chat
          };
          let newMessageItem = {
            senderId: sender.id,
            receiverId: receiver.id,
            conversationType: MessageModel.conversationTypes.PERSONAL,
            messageType: MessageModel.messageTypes.TEXT,
            sender: sender,
            receiver: receiver,
            text: messageVal,
            createdAt: Date.now()
          };
          // create new message
          let newMessage = await MessageModel.model.createNew(newMessageItem);
          // update contact
          await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id);
          resolve(newMessage);
      };
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllConversationItems,
  addNewTextEmoji
};
