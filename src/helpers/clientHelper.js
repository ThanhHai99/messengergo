import moment from "moment";

let bufferToBase64 = (bufferFrom) => {
  return Buffer.from(bufferFrom).toString("base64");
}

let lastItemOfArray = (array) => {
  if (!array.length) {
    return [];
  }
  return array[array.length - 1];
};

let convertTimestampToHumanTime = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return moment(timestamp).locale("vi").startOf("seconds").fromNow();
};

module.exports = {
  bufferToBase64,
  lastItemOfArray,
  convertTimestampToHumanTime
};
