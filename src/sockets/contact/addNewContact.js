/**
 * 
 * @param io from socket.io library
 */
let addNewContact = (io) => {
  io.on("connection", (socket) => {
    socket.on("add-new-contact", (data) => {
      
    });
  });
};

module.exports = {
  addNewContact
};
