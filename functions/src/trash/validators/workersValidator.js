function validateReqWorker(req, res) {
    // Controlla il metodo HTTP
    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return false;
    }

    const { userId, workId } = req.body.data || req.body;
    // Verifica che i parametri obbligatori siano presenti
    if (!userId || !workId) {
        res.status(400).send({ error: "I parametri userId e workId sono obbligatori" });
        return false;
    }
    return true;
}

module.exports = { validateReqWorker };
