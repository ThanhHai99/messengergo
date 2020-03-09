import authService from "./authService";
import userService from "./userService";
import contService from "./contactService";
import notificationService from "./notificationService";
import messageService from "./messageService";

module.exports = {
  auth: authService,
  user: userService,
  contact: contService,
  notification: notificationService,
  message: messageService
};
