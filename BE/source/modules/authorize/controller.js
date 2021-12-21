const path = require('path');
const isEmptyObject = require('../../utils/isEmptyObject');
const Staff = require('../staff/model');

module.exports = {
    // Truy cập trang đăng nhập
    get: (req, res) => {
        if (req.session.staffId && req.session.hospitalId && req.session.roleId) {
            res.redirect('/');
        } else {
            res.sendFile(path.resolve(__dirname, '../../login.html'));
        }
    },
    // Đăng nhập
    post: async (req, res) => {
        try {
            if (isEmptyObject(req.body) && req.body.username && req.body.password) {
                let result = await Staff.authorize(req.body.username, req.body.password);
                if (result.status == 200) {
                    // Store session
                    req.session.hospitalId = result.user.hospitalId;
                    req.session.roleId = result.user.roleId;
                    req.session.staffId = result.user.staffId;
                }
                res.status(result.status);
                res.send(result);
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Tài khoản hoặc mật khẩu không hợp lệ"
                })
            }
        } catch (error) {
            res.status(500).send({
                status: 500,
                error: "Internal Server Error"
            })
        }
    }
}