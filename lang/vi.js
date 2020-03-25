const transValidation = {
  email_incorrect: "Email không hợp lệ.",
  gender_incorrect: "Sao giới tính lại bị sai nhỉ?",
  password_incorrect: "Mật khẩu không hợp lệ.",
  password_new_incorrect: "Mật khẩu mới không hợp lệ.",
  password_confirmation_incorrect: "Mật khẩu nhập lại không hợp lệ.",
  update_username: "Username giới hạn trong khoảng 3-17 ký tự không chứa ký tự đặc biệt.",
  update_gender: "Oops! Wow bạn là hacker à!!!",
  update_address: "Địa chỉ giới hạn 3-30 ký tự.",
  update_phone: "Số điện thoại bắt đầu bằng số 0, giới hạn khoảng 10-11 ký tự.",
  find_user: "Nhập tên người dùng để tìm kiếm.",
  message_text_emoji_incorrect: "Tin nhắn không hợp lệ."
};

const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tài khoản này đã bị loại khỏi hệ thống. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi",
  account_not_active: "Email này đã được đăng kí nhưng chưa active, vui lòng kiểm tra email của bạn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi.",
  account_undefined: "Tài khoản không tồn tại",
  token_undefined: "Token không tồn tại!",
  login_failed: "Sai mật khẩu hoặc tài khoản!",
  server_error: "Có lỗi ở phía server. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi để báo cáo lỗi này, xin cảm ơn.",
  avatar_type: "Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.",
  avatar_size: "Chỉ cho phép ảnh tối đa là 1MB.",
  user_current_password_failed: "Mật khẩu hiện tại không chính xác",
  conversation_not_found: "Cuộc trò chuyện không tồn tại.",
  image_message_type: "Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.",
  image_message_size: "Chỉ cho phép ảnh tối đa là 1MB.",
  attachment_message_type: "Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.",
  attachment_message_size: "Chỉ cho phép file tối đa là 1MB.",
};

const transSuccess = {
  userCreated: userEmail => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để active tài khoản trước khi đăng nhập, xin cảm ơn.`;
  },
  account_actived:
    "Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập vào ứng dụng.",
  loginSuccess: username => {
    return `Xin chào ${username}, chúc bạn một ngày tốt lành.`;
  },
  logout_success: "Đăng xuất tài khoản thành công, hẹn gặp lại bạn!",
  user_info_updated: "Cập nhật thông tin người dùng thành công",
  user_password_updated: "Cập nhật mật khẩu thành công"
};

const transMail = {
  subject: "Messenger Go: Xác nhận kích hoạt tài khoản.",
  template: linkVerify => {
    return `
            <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng Messenger Go.</h2>
            <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng.</h4>
        `;
  },
  send_failed:
    "Có lỗi trong quá trình gửi email, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi."
};

module.exports = { transValidation, transErrors, transSuccess, transMail };
