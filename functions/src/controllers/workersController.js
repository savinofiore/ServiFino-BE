const admin = require("firebase-admin");

const addWorker = async (req, res) => {
    try {
        const { userId, workId, available  } = req.body; // Prendi userId, workId e available dalla richiesta
        // Crea un oggetto worker
        const workerDoc = {
            userId: userId, // L'ID dell'utente come ID del worker
            workId: workId,
            available: available,
        };
        // Salva il worker nel database evitando la duplicazione per lo stesso utente
        await admin.firestore().collection("workers").doc(userId).set(workerDoc, { merge: true });
        return res.status(201).send({
            message: "Worker added successfully",
            worker: workerDoc,
        });
    } catch (error) {
        console.error("Error adding worker:", error);
        return res.status(500).send({ error: error.message });
    }
};



module.exports = {addWorker}