import mongoose from "mongoose";

let Schema = mongoose.Schema;
let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 177 },
  messageAmount: { type: Number, default: 0 },
  userId: String,
  members: [
    { userId: String }
  ],
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: { type: Number, default: null }
});

ChatGroupSchema.statics = {
  /**
   * Get chat group item by userId(currentUserId) and limit
   * @param {String} userId 
   * @param {Number limit 
   */
  getChatGroups(userId, limit) {
    return this.find({
      "members": {$elemMatch: {"userId": userId}}
    }).sort({"updatedAt": -1}).limit(limit).exec();
  },
  
  getChatGroupById(id) {
    return this.findById(id).exec();
  },

  /**
   * Update group chat when has new message
   * @param {String} id of group chat
   * @param {Number} newMessageAmount 
   */
  updateWhenHasNewMessage(id, newMessageAmount) {
    return this.findByIdAndUpdate(id, {
      "messageAmount": newMessageAmount,
      "updatedAt": Date.now()
    })
  }
};

module.exports = mongoose.model("chat-group", ChatGroupSchema);
