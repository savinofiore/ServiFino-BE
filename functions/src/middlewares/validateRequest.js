const validateCreateUser = (req, res, next) => {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
        return res.status(400).send({
            error: "Missing required fields: email, password, displayName",
        });
    }

    next(); // Procede al controller se i dati sono validi
};

module.exports = { validateCreateUser };
