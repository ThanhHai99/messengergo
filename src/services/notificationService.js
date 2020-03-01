import NotificationModel from "./../models/notificationModel";
import UserModel from "./../models/userModel";

const LIMIT_NUMBER_TAKEN = 1;

/**
 * Get notification when refresh page
 * Just 10 item one time.
 * @param {String} currentUserId 
 * @param {Number} limit 
 */
let getNotifications = (currentUserId) => {
  return new Promise( async (resolve, reject) => {
    try {
      let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, LIMIT_NUMBER_TAKEN);

      let getNotifContents = notifications.map(async(notification) => {
        let sender = await UserModel.findUserById(notification.senderId);
        return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });

      resolve(await Promise.all(getNotifContents));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Count all notification unread
 * @param {String} currentUserId 
 */

let countNotifUnread = (currentUserId) => {
  return new Promise( async (resolve, reject) => {
    try {
      let notificationsUnread = await NotificationModel.model.countNotifUnread(currentUserId);
      resolve(notificationsUnread);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Read more notification max 10 items one time.
 * @param {String} currentUserId 
 * @param {Number} skipNumberNotification 
 */
let readMore = (currentUserId, skipNumberNotification) => {
  return new Promise( async (resolve, reject) => {
    try {
      let newNotification = await NotificationModel.model.readMore(currentUserId, skipNumberNotification, LIMIT_NUMBER_TAKEN);
      let getNotifContents = newNotification.map(async(notification) => {
        let sender = await UserModel.findUserById(notification.senderId);
        return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });

      resolve(await Promise.all(getNotifContents));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getNotifications,
  countNotifUnread,
  readMore
}
