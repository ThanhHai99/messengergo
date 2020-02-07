import addNewContact from "./contact/addNewContact"

/**
 * 
 * @param io from socket.io library
 */
let initSockets = (io) => {
  addNewContact(io);
};

module.exports = initSockets;
