module.exports = {
    emptyValidate: (req, res, next) => {
        if (!req.body || !req.body.hospitalId ||
            !req.body.staffName ||
            !req.body.phone ||
            !req.body.dob ||
            !req.body.address ||
            !req.body.roleId)
            res.status(400).send("Thiếu trường thông tin");
        else next();
    },
    authorizeValidate: (req, res, next) => {
        if (req.session.roleId == 1 || req.session.roleId == 5) next();
        else res.status(400).send("Không có quyền xóa");
    },
    selfDeleteValidate: (req, res, next) => {
        if (req.session.staffId == req.params.id) res.status(400).send("Không thể xóa chính mình");
        else next();
    },
    // Kiểm tra người thêm có thêm vào bệnh viên mình đang làm việc hay không (Không áp dụng với nhân viên sở y tế
    addStaffSameHospitalValidate: (req, res, next) => {
        if (req.body.hospitalId != req.session.hospitalId && req.session.hospitalId != 1) res.status(400).send("Chỉ có thể thêm nhân viên vào cùng bệnh viện");
        else next();
    },
    // Không cho phép người làm việc ở sở y tế có vị trí ngoài Nhân viên sở y tế
    baseHospitalStaffValidate: (req, res, next) => {
        if (req.session.hospitalId == 1 && req.body.hospitalId == 1 && req.body.roleId != 1) res.status(400).send("Làm việc ở Sở y tế phải là nhân viên sở y tế");
        else next();
    }
}