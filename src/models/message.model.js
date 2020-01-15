//message.model.js
import mongose, { Schema } from "mongoose";

// const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let MessageSchema = new Schema({
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
  text: String,
  file: { data: Buffer, contenType: String, fileName: String },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null }
});

module.exports = mongose.model("message", MessageSchema);
