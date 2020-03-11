function textAndEmojiChat(divId) {
  $(".emojionearea").unbind("keyup").on("keyup", function (element) {
    if (element.which === 13) { // Nhấn phím Enter
      let targetId = $(`#write-chat-${divId}`).data("chat");
      let messageVal = $(`#write-chat-${divId}`).val();

      if (!targetId.length || !messageVal.length) {
        return false;
      }

      let dataTextEmojiForSend = {
        uid: targetId,
        messageVal: messageVal
      };

      if ($(`#write-chat-${divId}`).hasClass("chat-in-group")) {
        dataTextEmojiForSend.isChatGroup = true;
      }

      //call send message
      $.post("/message/add-new-text-emoji", dataTextEmojiForSend, function(data) {
        let messageOfMe = $(`<div class="bubble me data-mess-id="<%= message._id %>">${data.message._id}</div>`);
        if (dataTextEmojiForSend.isChatGroup) {
          messageOfMe.html(`<img src="/images/users/${data.message._id}" class="avatar-small" title="<%= message.sender.name %>">`);
        }
      }).fail(function(response) {
        alertify.notify(response.responseText, "error", 7);
      });
    }
  });
}
