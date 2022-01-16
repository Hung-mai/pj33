module.exports = {
    emptyValidate: (req, res, next) => {
        if (!req.body || !req.body.address || !req.body.name)
            res.status(400).send({
                "error": "All fields are required"
            });
        else next();
    },
    duplicateNameValidate: (req, res, next) => {
        
    }
}