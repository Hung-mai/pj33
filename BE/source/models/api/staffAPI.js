const express = require('express');
const staffAPI = express.Router();
const staffController = require('../../modules/staff/controller');
const staffInfoValidate = require('../../middlewares/staff/staffInfoValidate');
const sessionLogger = require('../../middlewares/global/sessionLogger');
const authorizeMiddleware = require('../../middlewares/global/authorizeMiddleware');
const { Role } = require('../../public/enum');

staffAPI.get('/', staffController.getStaffList)
    .get('/userInfo', staffController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    .get('/:id', staffController.getStaffInfoById)
    .post('/assign', // Giao phòng bệnh cho một nhân viên
        authorizeMiddleware.isHospitalAdmin, // Người giao phải là quản lý bệnh viện
        staffInfoValidate.assignStaffBodyValidate, // Kiểm tra body của request
        staffInfoValidate.checkSameHospital, // Cùng bệnh viên, là nhân viên y tế cơ sở
        staffController.assignStaffToRoom // Thực hiện giao phòng
    )
    .post('/unassign', // Hủy giao phòng cho một nhân viên  
        authorizeMiddleware.isHospitalAdmin, // Người hủy giao phải là quản lý bệnh viện  
        staffInfoValidate.assignStaffBodyValidate, // Kiểm tra body của request
        staffInfoValidate.checkSameHospital, // Cùng bệnh viên, là nhân viên y tế cơ sở
        staffController.unassignRoom // Thực hiện hủy giao phòng
    )
    /**
     * Thêm nhân viên y tế:
     *  - Nhân viên sở y tế: Thêm vào nhân viên testcamp, thêm nhân viên sở y tế, thêm nhân viên quản lý cơ sở y tế và nhân viên y tế
     *  - Nhân viên quản lý cơ sở y tế: Thêm nhân viên y tế cơ sở
     */
    .post('/admin', authorizeMiddleware.isAdmin, // Là nhân viên sở y tế
        staffInfoValidate.emptyValidate, // Kiểm tra body của request
        staffInfoValidate.checkValidAddInfoFromAdmin, // Kiểm tra nội dung cụ thể
        staffController.addStaff)
    .post('/hospitaladmin', authorizeMiddleware.isHospitalAdmin,
        staffInfoValidate.emptyValidate,
        staffInfoValidate.checkValidAddInfoFromHospitalAdmin,
        staffController.addStaff
    )
    // .post('/testcampstaff', authorizeMiddleware.isTestcampStaff,
    //     staffInfoValidate.emptyValidate,
    //     staffInfoValidate.testcampStaffFiller,
    //     staffController.addStaff
    // )
    .put('/admin/:id', authorizeMiddleware.isAdmin,
        staffInfoValidate.emptyValidate,
        staffInfoValidate.checkValidUpdateInfoFromAdmin,
        staffController.updateStaff)
    .put('/hospitaladmin/:id',
        authorizeMiddleware.isHospitalAdmin,
        staffInfoValidate.emptyValidate,
        staffInfoValidate.checkValidUpdateInfoFromHospitalAdmin,
        staffController.updateStaff
    )
    // .put('/testcampstaff/:id',
    //     authorizeMiddleware.isTestcampStaff,
    //     staffInfoValidate.emptyValidate,
    //     staffInfoValidate.testcampStaffFiller,
    //     staffController.updateStaff
    // )
    .delete('/:id',
        staffInfoValidate.authorizeDeleteValidate,
        staffInfoValidate.isAssigned,
        staffInfoValidate.selfDeleteValidate,
        staffController.delete
    )

module.exports = staffAPI;