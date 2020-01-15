let getLoginRegister = (req, res) => {
    res.render("auth/loginRegister");
};
let getLogout = (req, res) => {
    res.render("auth/logout");
};

module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout
};
