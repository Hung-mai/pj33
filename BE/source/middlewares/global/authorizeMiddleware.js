const {Role} = require('../../public/enum');

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (
            !req.session.hospitalId
            || !req.session.roleId
            || !req.session.staffId
            || req.session.hospitalType === undefined || req.session.hospitalType === null
        ) {
            res.status(401).send('Cần đăng nhập trước khi thực hiện yêu cầu');
        } else next();
    },
    /**
     * Kiểm tra người dùng có phải admin không
     * @param {Request} req Request
     * @param {Response} res Response
     * @param {*} next 
     */
    isAdmin: (req, res, next) => {
        if (req.session.roleId == Role.admin) next();
        else res.status(400).send("Chỉ nhân viên sở y tế mới có quyền truy cập");
    },
    /**
     * Kiểm tra người dùng có phải quản lý bệnh viện không  
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isHospitalAdmin: (req, res, next) => {
        if (req.session.roleId == Role.hospitaladmin) next();
        else res.status(400).send("Chỉ nhân viên quản lý cơ sở y tế mới có quyền truy cập");
    },
    /**
     * Kiểm tra người dùng có phải nhân viên điểm xét nghiệm không  
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isTestcampStaff: (req, res, next) => {
        if (req.session.roleId == Role.testcampstaff) next();
        else res.status(400).send("Chỉ nhân viên điểm xét nghiệm mới có quyền truy cập");
    },
    /**
     * Kiểm tra người dùng có phải nhân viên bệnh viện không
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    isHospitalStaff: (req, res, next) => {
        if (req.session.roleId == Role.nurse || req.session.roleId == Role.doctor) next();
        else res.status(400).send("Chỉ nhân viên bệnh viện mới có quyền truy cập");
    },
    
}