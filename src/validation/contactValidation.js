import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let findUsersContact = [
  check("find-contact", transValidation.find_user)
    .isLength({min: 1})
];

module.exports = {
  findUsersContact
};
