module.exports = (req, res, next) => {
    if (!req.session.hospitalId || !req.session.roleId || !req.session.staffId) {
        res.redirect('/login');
    } else next();
}