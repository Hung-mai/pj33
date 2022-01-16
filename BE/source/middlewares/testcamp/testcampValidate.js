const Staff = require('../../modules/staff/model');

module.exports = {
    emptyValidate: (req, res, next) => {
        if (!req.body || !req.body.address || !req.body.name)
            res.status(400).send({
                "error": "All fields are required"
            });
        else next();
    },
    duplicateNameValidate: (req, res, next) => {
        next();
    },
    checkStillHasStaff: async (req, res, next) => {
        let result = await Staff.getByHospitalId(req.params.id)
        
        if(Object.keys(result).length != 0) {
            res.status(400).send({
                "error": "Bệnh viện đang còn nhân viên, không thể xóa"
            });
        } else {
            next();
        }
        
    },
}