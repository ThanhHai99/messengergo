//notification.model.js
import mongose, { Schema } from "mongoose";
// const mongoose = require("mongoose");

let Schema = mongoose,
  Schema;
let NotificationSchema = new Schema({
  sender: {
    id: String,
    username: String,
    avartar: String
  },
  receiver: {
    id: String,
    username: String,
    avartar: String
  },
  type: String,
  content: String,
  isRead: { type: Boolean, default: false },
  createAt: { type: Number, default: Date.now }
});

module.exports = mongose.model("notification", NotificationSchema);
