const Room = require("./model");

module.exports = {
    // Only with normal hospital
    hospitalIdValidate: (req, res, next) => {
        if (req.session.hospitalId > 1) next(); 
        else res.status(400).send("Yêu cầu truy cập không hợp lệ, chỉ cho phép nhân viên y tế cơ sở");
    },
    
    emptyBodyValidate: (req, res, next) => {
        if (!req.body || !req.body.roomNumber || !req.body.beds || isNaN(req.body.roomNumber) || isNaN(req.body.beds)) {
            res.status(400).send("Thông tin không hợp lệ");
        } else next();
    },

    bedsValidate: async (req, res, next) => {
        let isFull = await Room.checkFull(req.body.roomId);
    }
}