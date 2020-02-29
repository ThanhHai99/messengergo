import authService from "./authService";
import userService from "./userService";
import contService from "./contactService";
import notificationService from "./notificationService";

module.exports = {
  auth: authService,
  user: userService,
  contact: contService,
  notification: notificationService
};
