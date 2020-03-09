let bufferToBase64 = (bufferFrom) => {
  return Buffer.from(bufferFrom).toString("base64");
}
module.exports = {
  bufferToBase64
};
