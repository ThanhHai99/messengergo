const app = {
  max_event_listeners: 30,
  avatar_directory: "src/public/images/users",
  avatar_type: ["image/png", "image/jpg", "image/jpeg"],
  avatar_limit_size: 1048576, //byte = 1MB
  general_avatar_group_chat: "group-avatar-default.png",
  image_message_directory: "src/public/images/chat/message",
  image_message_type: ["image/png", "image/jpg", "image/jpeg"],
  image_message_limit_size: 1048576, //byte = 1MB
  attachment_message_directory: "src/public/images/chat/message",
  atttachment_message_type: ["image/png", "image/jpg", "image/jpeg"],
  attachment_message_limit_size: 1048576, //byte = 1MB
};

module.exports = { app };
