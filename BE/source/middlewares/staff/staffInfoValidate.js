module.exports = (req, res, next) => {
    if (!req.body.hospitalId ||
        !req.body.staffName ||
        !req.body.phone ||
        !req.body.dateOfBirth ||
        !req.body.address)
        res.status(400).send({
            "error": "All fields are required"
        });
    else next();
}