import UserModel from "./../models/userModel";
import {transErrors} from "./../../lang/vi";
import bcrypt from "bcrypt";

const saltRounds = 7;

/**
 * Update UserInfo
 * @param {userId} id
 * @param {data update} dataUpdate
 */

let updateUser = (id, dataUpdate) => {
  return UserModel.updateUser(id, dataUpdate);
};

/**
 * Update password for user
 * @param {userId} id 
 * @param {data upadte} dataUpdate 
 */

let updatePassword = (id, dataUpdate) => {
  return new Promise(async(resolve, reject) => {
    let currentUser = await UserModel.findUserByIdToUpdatePassword(id);
    if(!currentUser){
      return reject(transErrors.account_undefined);
    }

    let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword);
    if(!checkCurrentPassword){
      return reject(transErrors.user_current_password_failed);
    }

    let salt = bcrypt.genSaltSync(saltRounds);
    await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt));
    resolve(true);
  });
};

module.exports = { updateUser, updatePassword };
