import mongoose from "mongoose";

let Schema = mongoose.Schema;
let MessageSchema = new Schema({
  senderId: String,
  receiverId: String,
  conversationType: String,
  messageType: String,
  sender: {
    id: String,
    username: String,
    avatar: String
  },
  receiver: {
    id: String,
    username: String,
    avatar: String
  },
  text: String,
  file: { data: Buffer, contentType: String, fileName: String },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

MessageSchema.statics = {
  /**
   * Get limited Item
   * @param {String} senderId CureentUserId
   * @param {String} receiverId 
   * @param {Number} limit 
   */
  getMessages(senderId, receiverId, limit) {
    return this.find({
      $or: [
        {
          $and: [
            {"senderId": senderId},
            {"receiverId": receiverId}
          ]
        },
        {
          $and: [
            {"receiverId": senderId},
            {"senderId": receiverId}
          ]
        }
      ]
    }).sort({"createdAt": 1}).limit(limit).exec();
  }
}

const MESSAGE_CONVERSATION_TYPES = {
  PERSIONAL: "persional",
  GROUP: "group"
}

const MESSAGE_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  FILE: "file"
}

module.exports = {
  model: mongoose.model("message", MessageSchema),
  conversationTypes: MESSAGE_CONVERSATION_TYPES,
  messageTypes: MESSAGE_TYPE
};
