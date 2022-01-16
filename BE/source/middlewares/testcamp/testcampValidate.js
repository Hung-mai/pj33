const db = require('../../models/db');

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
    checkStillHasStaff: (req, res, next) => {
        // console.log(req.params)
        let query = `SELECT * from Staff WHERE hospitalId = ${req.params.id}`;

        let result = db.queryDB(query) 
        if(Object.keys(result).length == 0) {
            res.status(400).send({
                "error": "Bệnh viện đang còn nhân viên, không thể xóa"
            });
        } else {
            next();
        }
        
    },
}