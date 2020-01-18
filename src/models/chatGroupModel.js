//chatGroup.model.js
import mongose, { Schema } from "mongoose";

let Schema = mongoose.Schema;
let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 177 },
  messageAmount: { type: Number, default: 0 },
  userId: String,
  numbers: [
    { userId: String }
  ],
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null }
});

module.exports = mongose.model("chat-group", ChatGroupSchema);
