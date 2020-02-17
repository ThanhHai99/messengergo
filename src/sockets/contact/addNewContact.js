import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";
/**
 * 
 * @param io from socket.io library
 */
let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        username: socket.request.user.username,
        avatar: socket.request.user.avatar
      };

      if(clients[data.contactId]){
        // clients[data.contactId].forEach(socketId => {
        //   io.sockets.connected[socketId].emit("response-add-new-contact", currentUser);
        // });
        emitNotifyToArray(clients, data.contactId, io, "response-add-new-contact", currentUser);
      }
    });

    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
    });
  });
};

module.exports = addNewContact;
