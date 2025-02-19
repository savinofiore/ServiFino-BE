const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const Owner = require("./models/Owner");
const User = require("./models/User");
const Reservation = require("./models/Reservation");
//const ReservationStatus = require("./models/ReservationStatus");
const cors = require("cors")({ origin: true });

/**
 * Funzione unificata per aggiungere o aggiornare un Owner
 */
const addOrUpdateOwner = v2.https.onRequest(async (req, res) => {
    //if (!validateReqOwner(req, res)) return;
    cors( req, res, async properties => {
        try {
            const { userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber } = req.body.data || req.body;
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
    })
});

/** Funzione per recuperare tutti gli utenti con isOwner = false
 */
const getNonOwnerUsers = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            // Recupera tutti gli utenti dalla collezione "users" dove isOwner è false
            const usersSnapshot = await admin.firestore()
                .collection("users")
                .where("isOwner", "==", false)
                .where("isAvailable", "==", true)
                .get();

            // Se non ci sono utenti, restituisci un array vuoto
            if (usersSnapshot.empty) {
                return res.status(200).send({
                    data: {
                        message: "No non-owner users found",
                        users: []
                    }
                });
            }
            // Mappa i documenti recuperati in un array di oggetti utente
            const users = [];
            usersSnapshot.forEach(doc => {
                const userData = doc.data();
                users.push({
                    uid: doc.id,
                    ...userData
                });
            });
            // Restituisci gli utenti trovati
            return res.status(200).send({
                data: {
                    message: "Non-owner users retrieved successfully",
                    users: users
                }
            });
        } catch (error) {
            console.error("Error retrieving non-owner users:", error);
            return res.status(500).send({
                data: { error: error.message }
            });
        }
    });
});

/** Funzione per prenotare un'utente
 * */
const addReservation = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            // Estrai i dati dalla richiesta
            const { user, owner, reservationDate, reservationStatus, rating , message} = req.body.data || req.body;
            // Crea un'istanza di Reservation
            const reservation = new Reservation(user, owner, reservationDate, reservationStatus, rating, message);
            // Riferimento al documento Firestore per la prenotazione
            const reservationsRef = admin.firestore().collection("reservations").doc();
            // Salva la prenotazione in Firestore utilizzando il metodo toFirestoreObject
            await reservationsRef.set(reservation.toFirestoreObject());
            // Risposta di successo
            return res.status(201).send({
                data: {
                    message: "Reservation booked successfully",
                    bookingId: reservationsRef.id,
                    reservation: reservation.toFirestoreObject(),
                }
            });
        } catch (e) {
            console.error("Error in booking reservation:", e);
            return res.status(500).send({ message: e.message });
        }
    });
});


const getReservationsSent = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            console.log('Richiesta ricevuta:', req.body); // Log della richiesta

            // Estrai l'userId dalla richiesta
            const { userId } = req.body.data || req.body;

            if (!userId) {
                console.error('UserId mancante nella richiesta');
                return res.status(400).send({ message: "UserId is required" });
            }

            console.log('UserId ricevuto:', userId); // Log dell'userId


            // Riferimento alla collezione Firestore delle prenotazioni
            const reservationsRef = admin.firestore().collection("reservations");

            // Esegui la query per ottenere le prenotazioni in attesa per l'utente
            const snapshot = await reservationsRef
                .where("owner.userUid", "==", userId)
                .get();

            console.log('Prenotazioni trovate:', snapshot.size); // Log del numero di prenotazioni

            // Se non ci sono prenotazioni, restituisci un array vuoto
            if (snapshot.empty) {
                return res.status(200).send({ data: [] });
            }

            // Estrai le prenotazioni e formattale per la risposta
            const reservations = [];
            snapshot.forEach(doc => {
                const reservation = doc.data();
                reservations.push({
                    id: doc.id,
                    ...reservation
                });
            });

            // Risposta di successo con la lista delle prenotazioni
            return res.status(200).send({ data: reservations });
        } catch (e) {
            console.error("Error retrieving reservations:", e);
            return res.status(500).send({ message: e.message });
        }
    });
});








module.exports = {addOrUpdateOwner, getNonOwnerUsers, addReservation, getReservationsSent};
