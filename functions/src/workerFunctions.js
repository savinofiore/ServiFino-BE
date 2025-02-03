const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const {validateReqWorker} = require("./validators/workersValidator");

/**
 * Funzione per aggiornare il lavoro di un utente.
 * Richiede nel body: userId, workId e available (il quale non deve essere undefined)
 */
const updateWorker = v2.https.onRequest(async (req, res) => {
    // Applica il validator: se fallisce, esce subito
    if (!validateReqWorker(req, res)) return;

    try {
        const { userId, workId, available } = req.body;

        // Verifica che il campo available sia definito
        if (available === undefined) {
            return res.status(400).send({ error: "Il parametro available è obbligatorio" });
        }

        // Aggiorna i campi 'work', 'isAvailable' e 'assignment' nel documento dell'utente
        await admin.firestore().collection("users").doc(userId).update({
            work: workId,
            isAvailable: available,
            assignment: true,
        });

        return res.status(200).send({
            message: "Work aggiornato con successo",
            userId,
            workId,
            available,
        });
    } catch (error) {
        console.error("Errore durante l'aggiornamento del lavoro:", error);
        return res.status(500).send({ error: error.message });
    }
});

module.exports = { updateWorker };
