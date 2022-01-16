const Hospital = require('../../modules/hospital/model');
const Room = require('../../modules/room/model');
const Staff = require('../../modules/staff/model');
const { Role, hospitalType } = require('../../public/enum');

module.exports = {
    emptyValidate: (req, res, next) => {
        console.log(req.body);
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
        if (req.session.roleId == Role.admin || req.session.roleId == Role.hospitaladmin) next();
        else res.status(400).send("Chỉ nhân viên quản lý bệnh viện hoặc nhân viên sở y tế có quyền xóa");
    },
    selfDeleteValidate: (req, res, next) => {
        if (req.session.staffId == req.params.id) res.status(400).send("Không thể xóa chính mình");
        else next();
    },
    isAssigned: async (req, res, next) => {
        let rooms = await Room.getRoomsByStaffId(req.params.id);
        if (rooms.length > 0) res.status(400).send("Nhân viên y tế đang phụ trách phòng bệnh, không thể xóa");
        else next();
    },

    /**
     * Kiểm tra thông tin thêm nhân viên y tế đối với request từ nhân viên sở y tế
     * @param {} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkValidAddInfoFromAdmin: async (req, res, next) => {
        // Thêm nhân viên sở y tế
        if (req.body.hospitalId == 1) {
            // Sửa body
            req.body.roleId = Role.admin;
            next();
        } else {
            let hospital = await Hospital.getById(req.body.hospitalId);
            if (hospital.length == 0) res.status(400).send("Bệnh viện không tồn tại");
            else if (hospital[0].type == hospitalType.hospital) { // Thêm vào bệnh viện
                if (req.body.roleId != Role.hospitaladmin &&
                    req.body.roleId != Role.nurse &&
                    req.body.roleId != Role.doctor
                ) res.status(400).send("Nhân viên sở y tế chỉ có thể thêm nhân viên quản lý hoặc y tá, bác sĩ vào bệnh viện");
                else next();
            } else if (hospital[0].type == hospitalType.testcamp) { // Thêm vào điểm xét nghiệm
                req.body.roleId = Role.testcampstaff;
                next();
            } else res.status(500).send("Internal Server Error");
        }
    },

    /**
     * Kiểm tra thông tin sửa đổi nhân viên y tế đối với request từ nhân viên sở y tế
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkValidUpdateInfoFromAdmin: async (req, res, next) => {
        let oldRecord = await Staff.getOneById(req.params.id);
        if (oldRecord.length == 0) res.status(400).send("Không tìm thấy nhân viên y tế");
        else if (oldRecord[0].hospitalId == req.body.hospitalId) {
            if (oldRecord[0].roleId == Role.admin || oldRecord[0].roleId == Role.testcampstaff) {
                req.body.roleId = oldRecord[0].roleId;
                next();
            } else {
                if (req.body.roleId == Role.admin || req.body.roleId == Role.testcampstaff) {
                    res.status(400).send("Vị trí không hợp lệ");
                } else next();
            }
        } else {
            let hospital = await Hospital.getById(req.body.hospitalId);
            let rooms = await Room.getRoomsByStaffId(req.params.id);
            if (rooms.length > 0) res.status(400).send(`Nhân viên này đang quản lý ${rooms.length} phòng bệnh`);
            else if (hospital.length == 0) res.status(400).send("Bệnh viện không tồn tại");
            else if (hospital[0].type == hospitalType.hospital) { // Chuyển vào bệnh viện khác
                if (req.body.roleId != Role.hospitaladmin &&
                    req.body.roleId != Role.nurse &&
                    req.body.roleId != Role.doctor
                ) res.status(400).send("Nhân viên sở y tế chỉ có thể thêm nhân viên quản lý hoặc y tá, bác sĩ vào bệnh viện");
                else next();
            } else if (hospital[0].type == hospitalType.testcamp) { // Thêm vào điểm xét nghiệm
                req.body.roleId = Role.testcampstaff;
                next();
            } else if (hospital[0].type == hospitalType.base) {
                req.body.roleId = Role.admin;
                next();
            } else res.status(500).send("Internal Server Error");
        }
    },

    /**
     * Kiểm tra thông tin thêm nhân viên y tế đối với request từ nhân viên quản lý bệnh viện
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkValidAddInfoFromHospitalAdmin: async (req, res, next) => {
        if (req.body.hospitalId != req.session.hospitalId) res.status(400).send("Chỉ có thể thêm nhân viên y tế vào cùng bệnh viện");
        else if (req.body.roleId == Role.testcampstaff || req.body.roleId == Role.admin) {
            res.status(400).send("Không thể thêm nhân viên y tế có vai trò trên vào bệnh viện");
        } else next();
    },

    /**
     * Kiểm tra thông tin sửa đổi nhân viên y tế đối với request từ nhân viên quản lý bệnh viện
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkValidUpdateInfoFromHospitalAdmin: async (req, res, next) => {
        if (req.body.hospitalId != req.session.hospitalId) res.status(400).send("Không thể chuyển nhân viên y tế sang bệnh viên khác, chỉ nhân viên sở y tế mới có thể");
        else if (req.body.roleId == Role.testcampstaff || req.body.roleId == Role.admin) {
            res.status(400).send("Vị trí của nhân viên y tế phải là quản lý bệnh viện, y tá hoặc bác sĩ");
        } else next();
    },

    /**
     * Kiểm tra gói tin giao phòng cho nhân viên
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    assignStaffBodyValidate: (req, res, next) => {
        if (!req.body || !req.body.staffId || !req.body.roomId || isNaN(req.body.staffId) || isNaN(req.body.staffId)) res.status(400).send("Thông tin không hợp lệ");
        else next();
    },

    /**
     * Kiểm tra xem nhân viên y tế và phòng bệnh có cùng bệnh viện
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkSameHospital: async (req, res, next) => {
        let isValid = await Staff.checkSameHospital(req.body.staffId, req.body.roomId, req.session.staffId);
        if (isValid) next();
        else res.status(400).send("Không thể giao phòng bệnh cho nhân viên y tế này");
    },

    /**
     * Chuyển hospitalId về id của testcamp, vị trí về testcampstaff
     */
    testcampStaffFiller: (req, res, next) => {
        req.body.hospitalId = req.session.hospitalId;
        req.body.roleId = req.session.roleId;
        next();
    }
}