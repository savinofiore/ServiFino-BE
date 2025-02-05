
const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const { validateReqOwner } = require("./validators/ownersValidator");
const Owner = require("./models/Owner");

/*
 * Funzione unificata per aggiungere o aggiornare un Owner
 */
const addOrUpdateOwner = v2.https.onRequest(async (req, res) => {
    if (!validateReqOwner(req, res)) return;

    try {
        const { userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber } = req.body.data || req.body;

        // Crea un'istanza di Owner con i dati forniti
        const owner = new Owner(userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber);

        // Riferimento al documento Firestore
        const ownerDocRef = admin.firestore().collection("owners").doc(userUid);

        // Verifica se l'Owner esiste già
        const ownerDoc = await ownerDocRef.get();

        if (ownerDoc.exists) {
            // Se l'Owner esiste, aggiorna il documento
            await ownerDocRef.update(owner.toFirestoreObject());
            return res.status(200).send({
                data: {
                    message: "Owner added successfully",
                    owner:owner.toFirestoreObject(),
                }
            });
        } else {
            // Se l'Owner non esiste, crea un nuovo documento
            await ownerDocRef.set(owner.toFirestoreObject());
            return res.status(201).send({
                data: {
                    message: "Owner added successfully",
                    owner:owner.toFirestoreObject(),
                }
                //ownerId: ownerDocRef.id,
            });
        }
    } catch (e) {
        console.error("Error in addOrUpdateOwner:", e);
        return res.status(500).send({ message: e.message });
    }
});

module.exports = {addOrUpdateOwner};
