const transValidation = {
    email_incorrect: "Email không hợp lệ.",
    gender_incorrect: "Sao giới tính lại bị sai nhỉ?",
    password_incorrect: "Mật khẩu không hợp lệ.",
    password_confirmation_incorrect: "Mật khẩu nhập lại không hợp lệ."
};

const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã bị loại khỏi hệ thống. Vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi",
    account_not_active: "Email này đã được đăng kí nhưng chưa active, vui lòng kiểm tra email của bạn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi."
};

const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để active tài khoản trước khi đăng nhập, xin cảm ơn.`;
    }
};

module.exports = {transValidation, transErrors, transSuccess};

