module.exports = (req, res, next) => {
    if (!req.body.hospitalId ||
        !req.body.roomId ||
        !req.body.patientName ||
        !req.body.identifyNumber ||
        !req.body.healthInsuranceNumber ||
        !req.body.address ||
        !req.body.phone ||
        !req.body.dob ||
        !req.body.sex ||
        !req.body.startTime)
        res.status(400).send({
            "error": "All fields are required"
        });
    else next();
}