const Staff = require('../../modules/staff/model');
const Hospital = require('../../modules/hospital/model');

module.exports = {
    emptyValidate: async (req, res, next) => {
        let isPass = true;
        if (!req.body || !req.body.address || !req.body.name){
            res.status(400).send({
                "error": "All fields are required"
            });
            isPass = false;
        }

        let allHospital = await Hospital.getAll();
        allHospital.forEach(element => {
            if(element.name == req.body.name) {
                res.status(400).send({
                    "error": "Tên bệnh viên đã tồn tại"
                });
                isPass = false;
            }
        });
        
        if(isPass)
            next();
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