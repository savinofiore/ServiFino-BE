const getUsers = async (req, res) => {
    try {
        // Logica per recuperare gli utenti (ad esempio, da Firestore)
        res.status(200).send({ message: "Elenco utenti", data: [] });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = req.body; // Dati dell'utente
        // Logica per salvare l'utente in Firestore
        res.status(201).send({ message: "Utente creato", data: newUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { getUsers, createUser };
