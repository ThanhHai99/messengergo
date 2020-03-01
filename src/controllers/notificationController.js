import {notification} from "./../services/index";

let readMore = async (req, res) => {
  try {
    //get from query param
    let skipNumberNotification = +(req.query.skipNumber);
    //get more item
    let newNotifications = await notification.readMore(req.user._id, skipNumberNotification);
    return res.status(200).send(newNotifications);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  readMore
}
