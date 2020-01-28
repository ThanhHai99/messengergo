let getHome = (req, res) => {
    res.render("main/home/home", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user
    });
};

module.exports = {
    getHome: getHome
};
