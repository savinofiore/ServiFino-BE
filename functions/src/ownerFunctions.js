
const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const { validateReqOwner } = require("./validators/ownersValidator");
const Owner = require("./models/Owner");

/**
 * Funzione per aggiungere un Owner
 */
const addOwner = v2.https.onRequest(async (req, res) => {
    if (!validateReqOwner(req, res)) return;

    try {
        const { userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber } = req.body;

        const owner = new Owner(userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber);

        // Aggiunge il nuovo Owner a Firestore
        const ownerDocRef = await admin.firestore().collection("owners").add(owner.toFirestoreObject());

        return res.status(201).send({
            message: "Owner added successfully",
            owner: owner.toFirestoreObject(),
            ownerId: ownerDocRef.id,
        });
    } catch (e) {
        console.error("Error adding owner:", e);
        return res.status(500).send({ message: e.message });
    }
});

/**
 * Funzione per aggiornare un Owner
 */
const updateOwner = v2.https.onRequest(async (req, res) => {
    if (!validateReqOwner(req, res)) return;

    try {
        const { userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber } = req.body;

        const ownerToUpdate = new Owner(userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber);
        const ownerDocRef = admin.firestore().collection("owners").doc(userUid);

        await ownerDocRef.update(ownerToUpdate.toFirestoreObject());

        return res.status(200).send({
            message: "Owner updated successfully",
            owner: ownerToUpdate.toFirestoreObject(),
        });
    } catch (e) {
        console.error("Error updating owner:", e);
        return res.status(500).send({ message: e.message });
    }
});

module.exports = { addOwner, updateOwner };
