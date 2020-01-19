const transValidation = {
    email_incorrect: "Email không hợp lệ.",
    gender_incorrect: "Sao giới tính lại bị sai nhỉ?",
    password_incorrect: "Mật khẩu không hợp lệ.",
    password_confirmation_incorrect: "Mật khẩu nhập lại không hợp lệ."
};

const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã bị loại khỏi hệ thống. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi",
    account_not_active: "Email này đã được đăng kí nhưng chưa active, vui lòng kiểm tra email của bạn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi.",
    token_undefined: "Token không tồn tại!"
};

const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để active tài khoản trước khi đăng nhập, xin cảm ơn.`;
    },
    account_actived: "Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập vào ứng dụng."
};

const transMail = {
    subject: "Awesome Chat: Xác nhận kích hoạt tài khoản.",
    template: (linkVerify) => {
        return `
            <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng Awesome Chat.</h2>
            <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng.</h4>
        `;
    },
    send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi."
}

module.exports = {transValidation, transErrors, transSuccess, transMail};
