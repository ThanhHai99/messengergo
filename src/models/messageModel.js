import mongose, { Schema } from "mongoose";

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
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

module.exports = mongose.model("message", MessageSchema);
