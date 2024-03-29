import {contact} from "./../services/index";

let findUsersContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let keyword = req.params.keyword;
    let users = await contact.findUsersContact(currentUserId, keyword);
    return res.status(200).render("main/contact/sections/_findUsersContact", {users});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let addNew = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let newContact = await contact.addNew(currentUserId, contactId);
    return res.status(200).send({success: !!newContact});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeContact = await contact.removeContact(currentUserId, contactId);
    return res.status(200).send({success: !!removeContact});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeRequestContactSent = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeReq = await contact.removeRequestContactSent(currentUserId, contactId);
    return res.status(200).send({success: !!removeReq});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeRequestContactReceived = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeReq = await contact.removeRequestContactReceived(currentUserId, contactId);
    return res.status(200).send({success: !!removeReq});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let approveRequestContactReceived = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let approveReq = await contact.approveRequestContactReceived(currentUserId, contactId);
    return res.status(200).send({success: !!approveReq});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let readMoreContacts = async (req, res) => {
  try {
    //get from query param
    let skipNumberContacts = +(req.query.skipNumber);
    //get more item
    let newContactUsers = await contact.readMoreContacts(req.user._id, skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

let readMoreContactsSent = async (req, res) => {
  try {
    //get from query param
    let skipNumberContacts = +(req.query.skipNumber);
    //get more item
    let newContactUsers = await contact.readMoreContactsSent(req.user._id, skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

let readMoreContactsReceived = async (req, res) => {
  try {
    //get from query param
    let skipNumberContacts = +(req.query.skipNumber);
    //get more item
    let newContactUsers = await contact.readMoreContactsReceived(req.user._id, skipNumberContacts);
    return res.status(200).send(newContactUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  findUsersContact,
  addNew,
  removeContact,
  removeRequestContactSent,
  removeRequestContactReceived,
  approveRequestContactReceived,
  readMoreContacts,
  readMoreContactsSent,
  readMoreContactsReceived
};
