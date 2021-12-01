module.exports = (req, res, next) => {
    if (!req.body.staffId ||
        !req.body.patientId ||
        !req.body.treatmentTime ||
        !req.body.bodyTemperature ||
        !req.body.spO2 ||
        !req.body.breathingFrequency ||
        !req.body.heartbeat ||
        !req.body.bloodPresure ||
        !req.body.isFever ||
        !req.body.isCough ||
        !req.body.isSoreThroat ||
        !req.body.isOxygenSupport ||
        !req.body.isHardBreath ||
        !req.body.isMusclePain ||
        !req.body.isLossOfTaste)
        res.status(400).send({
            "error": "All fields are required"
        });
    else next();
}