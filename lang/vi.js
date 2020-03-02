const transValidation = {
  email_incorrect: "Email không hợp lệ.",
  displayName_incorrect: "Tên hiển thị quá ngắn.",
  gender_incorrect: "Sao giới tính lại bị sai nhỉ?",
  password_incorrect: "Mật khẩu không hợp lệ.",
  password_new_incorrect: "Mật khẩu mới không hợp lệ.",
  password_confirmation_incorrect: "Mật khẩu nhập lại không hợp lệ.",
  update_username: "Username gioi han trong khoang 3-17 ky tu khong chua ky tu dac biet.",
  update_gender: "Oops! Wow bạn là hacker à!!!",
  update_address: "Địa chỉ giới hạn 3-30 ký tự.",
  update_phone: "Số điện thoại bắt đầu bằng số 0, giới hạn khoảng 10-11 ký tự.",
  find_user: "Nhập tên người dùng để tìm kiếm."
};

const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tài khoản này đã bị loại khỏi hệ thống. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi",
  account_not_active: "Email này đã được đăng kí nhưng chưa active, vui lòng kiểm tra email của bạn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi.",
  account_undefined: "Tài khoản không tồn tại",
  token_undefined: "Token không tồn tại!",
  login_failed: "Sai mật khẩu hoặc tài khoản!",
  server_error: "Có lỗi ở phía server. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi để báo cáo lỗi này, xin cảm ơn.",
  avatar_type: "Kieu file khong hop le, chi chap nhan jpg & png.",
  avatar_size: "Chi cho phep anh toi da la 1MB.",
  user_current_password_failed: "Mật khẩu hiện tại không chính xác"
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
  user_info_updated: "Cap nhat thong tin user thanh cong",
  user_password_updated: "Cap nhat mat khau thanh cong"
};

const transMail = {
  subject: "Awesome Chat: Xác nhận kích hoạt tài khoản.",
  template: linkVerify => {
    return `
            <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng Awesome Chat.</h2>
            <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng.</h4>
        `;
  },
  send_failed:
    "Có lỗi trong quá trình gửi email, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi."
};

module.exports = { transValidation, transErrors, transSuccess, transMail };
