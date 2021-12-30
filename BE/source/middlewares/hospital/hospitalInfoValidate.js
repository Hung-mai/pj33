const Hospital = require('../../modules/hospital/model');

module.exports = {
    emptyValidate: (req, res, next) => {
        if (!req.body || !req.body.name || !req.body.name.trim() || !req.body.address || !req.body.address.trim()) res.status(400).send("Thiếu trường thông tin");
        else next();
    },
    authorizeValidate: (req, res, next) => {
        if (req.session.hospitalId != 1) res.status(400).send("Chỉ nhân viên sở y tế mới có thể thêm, sửa, xóa bệnh viện");
        else next();
    },
    unusedHospital: async (req, res, next) => {
        let isUnused = await Hospital.isUnusedHospital(req.params.id);
        if (isUnused) next();
        else res.status(400).send("Không thể xóa bệnh viện có nhân viên");
    },
    isBaseHospital: (req, res, next) => {
        if (req.params.id == 1) res.status(400).send("Không thể thực hiện với sở y tế");
        else next();
    }
}