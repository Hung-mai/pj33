const path = require('path');
const isEmptyObject = require('../../utils/isEmptyObject');
const Staff = require('../staff/model');

module.exports = {
    // Truy cập trang đăng nhập
    get: (req, res) => {
        if (req.session.staffId && req.session.hospitalId && req.session.roleId) {
            res.send(true);
        } else {
            res.send(false);
        }
    },
    // Đăng nhập
    post: async (req, res) => {
        try {
            if (!isEmptyObject(req.body) && req.body.username && req.body.password) {
                let result = await Staff.getOneByUsername(req.body.username);
                if (result.length == 0 || result[0].password != req.body.password) {
                    res.status(400).send("Thông tin tài khoản hoặc mật khẩu không chính xác");
                } else {
                    req.session.hospitalId = result[0].hospitalId;
                    req.session.roleId = result[0].roleId;
                    req.session.staffId = result[0].staffId;
                    res.status(200).send(true);
                }
            } else {
                res.status(400).send("Tài khoản và mật khẩu không hợp lệ")
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
    }
}