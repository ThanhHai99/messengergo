import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";
/**
 * @param io from socket.io library
 */
let chatVideo = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.request.user.chatGroupIds.forEach(group => {
      clients = pushSocketIdToArray(clients, group._id, socket.id);
    });
    socket.on("caller-check-listener-online-or-not", (data) => {
      if (clients[data.listenerId]) {
        // online
        let response = {
          callerId: socket.request.user._id,
          listenerId: data.listenerId,
          callerName: data.callerName
        };
        emitNotifyToArray(clients, data.listener, io, "server-request-peer-id-of-listener", response);

      } else {
        // offline
        socket.emit("server-send-listener-is-offline");
      }
    });

    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
      socket.request.user.chatGroupIds.forEach(group => {
        clients = removeSocketIdFromArray(clients, group._id, socket);
      });
    });
  });
};

