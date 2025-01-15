const validateCreateUser = (req, res, next) => {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
        return res.status(400).send({
            error: "Missing required fields: email, password, displayName",
        });
    }

    next(); // Procede al controller se i dati sono validi
};

const validateDeleteUser = (req, res, next) => {
    const { user, password, confirmedPassword } = req.body;

    if (!user || !password || !confirmedPassword) {
        return res.status(400).send({
            error: "Missing required fields: user, password, confirmedPassword",
        });
    }

    next();
}

module.exports = { validateCreateUser, validateDeleteUser };
