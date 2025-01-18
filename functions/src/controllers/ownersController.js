const admin = require("firebase-admin");
const Owner = require("../models/Owner");

const addOwner = async (req, res) => {
    try {
        const {
            userUid,
            activityName,
            activityDescription,
            activityLocation,
            activityWebsite,
            activityNumber
        } = req.body;
        const owner = new Owner(userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber);
        //Aggiungi owner, nessun controllo su id, un utente può registrare più attività/locali
        await admin.firestore().collection("owners").add(owner.toFirestoreObject());
        return res.status(201).send({
            message: "Owner added successfully",
            owner: {...owner.toFirestoreObject(), userId: owner.userUid},
        });
    } catch (e) {
        return res.status(500).send({
            message: e.message,
        })
    }
}

module.exports = { addOwner }