/*const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const cors = require("cors")({ origin: true });

const copyCollection = async (to, from) => {
    const snapshot = await admin.firestore().collection(from).get();
    const batch = admin.firestore().batch();

    snapshot.forEach((doc) => {
        const newDocRef = admin.firestore().collection(to).doc(doc.id);
        batch.set(newDocRef, doc.data());
    });

    await batch.commit();
    return snapshot.size;
};


const populateUsersStg = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            console.log('Popolamento users...');
            const total = await copyCollection('PROD_users', 'users');
            console.log('Users copiati con successo!');
            return res.status(201).send({ message: "Users copiati", total });
        } catch (e) {
            console.error("Errore:", e);
            return res.status(500).send({ message: e.message });
        }
    });
});

const populateOwnersStg = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            console.log('Popolamento owners...');
            const total = await copyCollection('PROD_owners', 'owners');
            console.log('Owners copiati con successo!');
            return res.status(201).send({ message: "Owners copiati", total });
        } catch (e) {
            console.error("Errore:", e);
            return res.status(500).send({ message: e.message });
        }
    });
});

const populateReservationsStg = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            console.log('Popolamento reservations...');
            const total = await copyCollection('PROD_reservations', 'reservations');
            console.log('Reservations copiate con successo!');
            return res.status(201).send({ message: "Reservations copiate", total });
        } catch (e) {
            console.error("Errore:", e);
            return res.status(500).send({ message: e.message });
        }
    });
});



module.exports = {
    populateUsersStg,
    populateOwnersStg,
    populateReservationsStg,
}*/
