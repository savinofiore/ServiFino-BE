const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ error: "Autenticazione richiesta" });
    }
    // Logica per verificare il token
    next();
};

module.exports = authMiddleware;
