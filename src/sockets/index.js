import addNewContact from "./contact/addNewContact"
import removeRequestContactSent from "./contact/removeRequestContactSent";
import removeRequestContactReceived from "./contact/removeRequestContactReceived";
import approveRequestContactReceived from "./contact/approveRequestContactReceived";
import removeContact from "./contact/removeContact";
import chatTextEmoji from "./chat/chatTextEmoji";
import typingOn from "./chat/typingOn";
import typingOff from "./chat/typingOff";
import chatImage from "./chat/chatImage";
import chatAttachment from "./chat/chatAttachment";
import chatVideo from "./chat/chatVideo";

/**
 * 
 * @param io from socket.io library
 */
let initSockets = (io) => {
  addNewContact(io);
  removeContact(io);
  removeRequestContactSent(io);
  removeRequestContactReceived(io);
  approveRequestContactReceived(io);
  chatTextEmoji(io);
  typingOn(io);
  typingOff(io);
  chatImage(io);
  chatAttachment(io);
  chatVideo(io);
};

module.exports = initSockets;
