import mongoose from "mongoose";
import { contact } from "../controllers";

let Schema = mongoose.Schema;
let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deleteAt: { type: Number, default: null }
});

ContactSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  findAllByUser(userId){
    return this.find({
      $or: [{"userId": userId}, {"contactId": userId}]
    }).exec();
  },

  /**
   * Check exists of 2 users
   * @param {String} userId 
   * @param {String} contactId 
   */
  checkExists(userId, contactId){
    return this.findOne({
      $or: [
        {$and: [{"userId": userId}, {"contactId": contactId}]},
        {$and: [{"userId": contactId}, {"contactId": userId}]}
      ]
    }).exec();
  },

  /**
   * Remove request contact sent
   * @param {String} userId 
   * @param {String} contactId 
   */
  removeRequestContactSent(userId, contactId) {
    return this.remove({
      $and: [{"userId": userId}, {"contactId": contactId}, {"status": false}]
    }).exec();
  },

  /**
   * Remove request contact received
   * @param {String} userId 
   * @param {String} contactId 
   */
  removeRequestContactReceived(userId, contactId) {
    return this.remove({
      $and: [{"contactId": userId}, {"userId": contactId}, {"status": false}]
    }).exec();
  },
  
  /**
   * Approve request contact received
   * @param {String} userId 
   * @param {String} contactId 
   */
  approveRequestContactReceived(userId, contactId) {
    return this.update({
      $and: [
        {"contactId": userId},
        {"userId": contactId},
        {"status": false}
      ]
    }, {"status": true}).exec();
  },

  /**
   * get contacts by userId and limit
   * @param {String} userId 
   * @param {Number} limit 
   */
  getContacts(userId, limit) {
    return this.find({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"createAt": -1}).limit(limit).exec();
  },

  /**
   * Get contacts sent by userId and limit
   * @param {String} userId 
   * @param {Number} limit 
   */
  getContactsSent(userId, limit) {
    return this.find({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).sort({"createAt": -1}).limit(limit).exec();
  },

  /**
   * Get contact received by userId and limit
   * @param {String} userId 
   * @param {Number} limit 
   */
  getContactsReceived(userId, limit) {
    return this.find({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).sort({"createAt": -1}).limit(limit).exec();
  },

  /**
   * count contacts by userId
   * @param {String} userId 
   */
  countAllContacts(userId) {
    return this.count({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).exec();
  },

  /**
   * count all contacts sent by userId
   * @param {String} userId 
   */
  countAllContactsSent(userId, limit) {
    return this.count({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).exec();
  },

  /**
   * count all contact received by userId
   * @param {String} userId 
   */
  countAllContactsReceived(userId, limit) {
    return this.count({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).exec();
  },

  readMoreContacts(userId, skip, limit) {
    return this.find({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"createAt": -1}).skip(skip).limit(limit).exec();
  },
  
  readMoreContactsSent(userId, skip, limit) {
    return this.find({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).sort({"createAt": -1}).skip(skip).limit(limit).exec();
  },
  
  readMoreContactsReceived(userId, skip, limit) {
    return this.find({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).sort({"createAt": -1}).skip(skip).limit(limit).exec();
  }
};

module.exports = mongoose.model("contact", ContactSchema);
