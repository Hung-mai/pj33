module.exports = (req, res, next) => {
    if (!req.body.address)
        res.status(400).send({
            "error": "All fields are required"
        });
    else next();
}