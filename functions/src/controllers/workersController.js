const admin = require("firebase-admin");
const Worker = require("../models/Worker");

/*const addWorker = async (req, res) => {
    try {
        const { userId, workId, available  } = req.body; // Prendi userId, workId e available dalla richiesta
        // Crea un oggetto worker
        const worker = new Worker(userId, workId, available);
        // Salva il worker nel database evitando la duplicazione per lo stesso utente
        await admin.firestore().collection("workers").doc(userId).set(worker.toFirestoreObject(), { merge: true });
        // Restituisce i dettagli del lavoratore
        return res.status(201).send({
            message: "Worker added successfully",
            worker: { ...worker.toFirestoreObject(), userId: worker.userId },
        });
    } catch (error) {
        console.error("Error adding worker:", error);
        return res.status(500).send({ error: error.message });
    }
};*/

const updateWorker = async (req, res) => {
    try {
        const { userId, workId, available } = req.body; // Prendi userId, workId e available dalla richiesta

        // Verifica che i campi obbligatori siano presenti
        if (!userId || !workId || available === undefined) {
            return res.status(400).send({ error: "userId, workId e available sono obbligatori" });
        }

        // Aggiorna il campo 'work' e 'isAvailable' nel documento dell'utente
        await admin.firestore().collection("users").doc(userId).update({
            work: workId,
            isAvailable: available,
        });

        // Restituisci una risposta di successo
        return res.status(200).send({
            message: "Work aggiornato con successo",
            userId: userId,
            workId: workId,
            available: available,
        });
    } catch (error) {
        console.error("Errore durante l'aggiornamento del lavoro:", error);
        return res.status(500).send({ error: error.message });
    }
};

/*const updateWorker = async (req, res) => {
    try{
        const { userId, workId, available  } = req.body;
        const workerToUpdate = new Worker(userId, workId, available);
        const workerDocRef = admin.firestore().collection("workers").doc(workerToUpdate.userId);
        await workerDocRef.update(workerToUpdate.toFirestoreObject());
        return res.status(201).send({
            message: "Worker updated successfully",
            worker: { ...workerToUpdate.toFirestoreObject(), userId: workerToUpdate.userId },
        });
    }catch (error) {
        console.error("Error updating worker:", error);
        return res.status(500).send({ error: error.message });
    }
}*/



module.exports = { updateWorker }