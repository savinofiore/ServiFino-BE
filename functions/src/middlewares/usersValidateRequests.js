
const validateCreateUser = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {

        return res.status(400).send({
            error: "Missing required fields: email, password, displayName",
        });
    }
    next(); // Procede al controller se i dati sono validi
};

const validateDeleteUser = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const { user, password, confirmedPassword } = req.body;

    if (!user || !password || !confirmedPassword) {
        return res.status(400).send({
            error: "User, password, and confirmed password are required",
        });
    }
    if (password !== confirmedPassword) {
        return res.status(400).send({
            error: "Password and confirmed password must be equal",
        });
    }
    next();
}

const validateUpdateUser = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const {user, displayName, phoneNumber} = req.body;
    if(!user || !displayName || !phoneNumber){
        return res.status(400).send({
            error: "Missing required fields: user, displayName, phoneNumber",
        });
    }
    next();
}

/*const validateLoginUser = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const { email, password } = req.body;
    // Verifica che i campi siano presenti
    if (!email || !password) {
        return res.status(400).send({
            error: "Email and password are required",
        });
    }
    next();
}*/

module.exports = { validateCreateUser, validateDeleteUser, validateUpdateUser };
