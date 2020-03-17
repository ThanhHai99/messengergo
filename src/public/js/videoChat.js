function videoChat(divId) {
  $(`#video-chat-${divId}`).unbind("click").on("click", function() {
    let targetId = $(this).data("chat");
    let callerName = $("#navbar-username").text();

    let dataToEmit = {
      listenerId: targetId,
      callerName: callerName
    };

    // Step 01. Of caller
    socket.emit("caller-check-listener-online-or-not", dataToEmit);
  });
};

$(document).ready(function() {
  // Step 02. Of caller
  socket.on("server-send-listener-is-offline", function() {
    alertify.notify("Người dùng này hiện không trực tuyến.", "error", 7);
  });

  let getPeerId = "";
  const peer = new Peer();
  peer.on("open", function(peerId){
    getPeerId = peerId;
  });
  // Step 03: Of listener
  socket.on("server-request-peer-id-of-listener", function(response) {
    let dataToEmit = {
      
    };
  });
});
