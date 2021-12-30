

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
    authorizeDeleteValidate: (req, res, next) => {
        if (req.session.roleId == 1 || req.session.roleId == 5) next();
        else res.status(400).send("Chỉ nhân viên quản lý bệnh viện hoặc nhân viên sở y tế có quyền xóa");
    },
    selfDeleteValidate: (req, res, next) => {
        if (req.session.staffId == req.params.id) res.status(400).send("Không thể xóa chính mình");
        else next();
    },
    /**
     * Chỉ cho phép nhân viên quản lý cơ sở y tế và nhân viên sở y tế thêm mới hay sửa nhân viên y tế
     * Nếu là nhân viên quản lý y tế phải thêm vào cùng cơ sở
     * @param {Request} req Request
     * @param {Response} res Response
     * @param {Middleware} next Next middleware
     */
    manipulateStaffInfoValidate: async (req, res, next) => {
        if (req.session.roleId == 1) next();
        else if (req.session.roleId == 5 && req.body.hospitalId == req.session.hospitalId && req.body.roleId != 4) next();
        else if (req.session.roleId != 5) res.status(400).send("Chỉ có nhân viên quản lý cơ sở y tế và nhân viên sở y tế có quyền thêm, sửa thông tin nhân viên y tế.");
        else if (req.session.roleId == 5) res.status(400).send("Nhân viên quản lý cơ sở y tế chỉ có thể thêm nhân viên y tế vào cùng cơ sở");
    },
    /**
     * Kiểm tra người thêm có thêm vào bệnh viên mình đang làm việc hay không (Không áp dụng với nhân viên sở y tế
     * @param {Request} req Request
     * @param {Response} res Response
     * @param {Middleware} next Next middleware
     */
    addStaffSameHospitalValidate: (req, res, next) => {
        if (req.body.hospitalId != req.session.hospitalId && req.session.hospitalId != 1) res.status(400).send("Chỉ có thể thêm nhân viên vào cùng bệnh viện");
        else next();
    },
    /**
     * Không cho phép người làm việc ở sở y tế có vị trí ngoài Nhân viên sở y tế
     * Không cho phép thêm nhân viên sở y tế bởi người không phải nhân viên y tế
     * @param {Request} req Request
     * @param {Response} res Response
     * @param {Middleware} next Next middleware
     */
    baseHospitalStaffValidate: (req, res, next) => {
        if ((req.session.hospitalId != 1 && req.body.roleId == 1) || (req.body.hospitalId == 1 && req.session.roleId != 1)) res.status(400).send("Nhân viên sở y tế chỉ được thêm bởi nhân viên sở y tế");
        else if (req.session.hospitalId == 1 && req.body.hospitalId == 1 && req.body.roleId != 1) res.status(400).send("Làm việc ở Sở y tế phải là nhân viên sở y tế");
        else next();
    }
}