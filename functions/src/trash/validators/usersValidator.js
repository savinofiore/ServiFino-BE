
// Valida i campi per la creazione dell'utente
function validateCreateUser(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return false;
    }
    const { email, password, displayName } = req.body.data || req.body;
    if (!email || !password || !displayName) {
        res.status(400).send({
            error: "Missing required fields: email, password, displayName",
        });
        return false;
    }
    return true;
}

// Valida i campi per l'eliminazione dell'utente
function validateDeleteUser(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return false;
    }
    const { user, password, confirmedPassword } = req.body.data || req.body;
    if (!user || !password || !confirmedPassword) {
        res.status(400).send({
            error: "User, password, and confirmed password are required",
        });
        return false;
    }
    if (password !== confirmedPassword) {
        res.status(400).send({
            error: "Password and confirmed password must be equal",
        });
        return false;
    }
    return true;
}

// Valida i campi per l'aggiornamento dell'utente
function validateUpdateUser(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return false;
    }
    const { user, displayName } = req.body.data || req.body;
    if (!user || !displayName) {
        res.status(400).send({
            error: "Missing required fields: user, displayName",
        });
        return false;
    }
    return true;
}

module.exports = { validateCreateUser, validateDeleteUser, validateUpdateUser };
