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
  
  removeRequestContactNotification(senderId, receiverId, type) {
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
  }
};

const NOTIFICATION_TYPES = {
  ADD_CONTACT: "add_contact"
};

const NOTIFICATION_CONTENTS = {
  getContent: (notificationType, isRead, userId, username, userAvatar) => {
    if (notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
      if(!isRead) {
        return `<span class="notif-readed-false" data-uid="${ userId }">
                  <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
                    <strong>${ username }</strong> đã gửi cho bạn một lời mời kết bạn!
                </span><br><br><br>`;

      }
      return `<span data-uid="${ userId }">
                <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
                  <strong>${ username }</strong> đã gửi cho bạn một lời mời kết bạn!
              </span><br><br><br>`;
    }
    return "No matching with any notification type.";
  }
};

module.exports = {
  model: mongoose.model("notification", NotificationSchema),
  types: NOTIFICATION_TYPES,
  contents: NOTIFICATION_CONTENTS
};
