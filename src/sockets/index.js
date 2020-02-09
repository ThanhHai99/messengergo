import addNewContact from "./contact/addNewContact"
import removeRequestContact from "./contact/removeRequestContact";

/**
 * 
 * @param io from socket.io library
 */
let initSockets = (io) => {
  addNewContact(io);
  removeRequestContact(io);
};

module.exports = initSockets;
