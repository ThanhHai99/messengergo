import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: { type: Boolean, default: false },
  createAt: { type: Number, default: Date.now }
});

NotificationSchema.statics = {
	createNew(item) {
		return this.create(item);
  },
  
  removeRequestContactSentNotification(senderId, receiverId, type) {
    return this.remove({
      $and: [
        {"senderId": senderId},
        {"receiverId": receiverId},
        {"type": type}
      ]
    }).exec();
  },

  /**
   * Get by userId and limit
   * @param {String} userId 
   * @param {Number} limit 
   */
  getByUserIdAndLimit(userId, limit) {
    return this.find({"receiverId": userId}).sort({"createAt": -1}).limit(limit).exec();
  },
  
  /**
   * Count all notification unread
   * @param {String} userId 
   * @param {String} limit 
   */
  countNotifUnread(userId) {
    return this.count({
      $and: [
        {"receiverId": userId},
        {"isRead": false}
      ]
    }).exec();
  },
  
  /**
   * Read more notification
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMore(userId, skip, limit) {
    return this.find({"receiverId": userId}).sort({"createAt": -1}).skip(skip).limit(limit).exec();
  },

  /**
   * Mark notification as read
   * @param {String} userId 
   * @param {Array} targetUsers 
   */
  markAllAsRead(userId, targetUsers) {
    return this.updateMany(
      {$and: [
        {"receiverId": userId}, 
        {"senderId": {$in: targetUsers}}
      ]},
      {"isRead": true}
      ).exec();
  }
};

const NOTIFICATION_TYPES = {
  ADD_CONTACT: "add_contact",
  APPROVE_CONTACT: "approve_contact"
};

const NOTIFICATION_CONTENTS = {
  getContent: (notificationType, isRead, userId, username, userAvatar) => {
    if (notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
      if(!isRead) {
        return `<div class="notif-readed-false" data-uid="${ userId }">
        <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
        <strong>${ username }</strong> đã gửi cho bạn một lời mời kết bạn!
        </div>`;

      }
      return `<div data-uid="${ userId }">
                <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
                  <strong>${ username }</strong> đã gửi cho bạn một lời mời kết bạn!
              </div>`;
    }
    
    if (notificationType === NOTIFICATION_TYPES.APPROVE_CONTACT) {
      if(!isRead) {
        return `<div class="notif-readed-false" data-uid="${ userId }">
        <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
        <strong>${ username }</strong> đã chấp nhận lời mời kết bạn của bạn!
        </div>`;

      }
      return `<div data-uid="${ userId }">
                <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
                  <strong>${ username }</strong> đã chấp nhận lời mời kết bạn của bạn!
              </div>`;
    }
    return "No matching with any notification type.";
  },

};

module.exports = {
  model: mongoose.model("notification", NotificationSchema),
  types: NOTIFICATION_TYPES,
  contents: NOTIFICATION_CONTENTS
};
