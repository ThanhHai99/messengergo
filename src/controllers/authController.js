let getLoginRegister = (req, res) => {
    res.render("auth/master");
};
let getLogout = (req, res) => {
    res.render("auth/logout");
};

module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout
};
