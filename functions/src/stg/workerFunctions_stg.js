const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const cors = require("cors")({ origin: true });
const User = require("../models/User");
const {log} = require("firebase-functions/logger");
const Reservation = require("../models/Reservation");


const ReservationsCollection = require("../utils/collections").ReservationsCollection_stg;

const getReservationsWaitingByUserId_stg = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
             // Estrai l'userId dalla richiesta
            const { userId } = req.body.data || req.body;

            if (!userId) {
                console.error('UserId mancante nella richiesta');
                return res.status(400).send({ message: "UserId is required" });
            }

            console.log('UserId ricevuto:', userId); // Log dell'userId

            // Ottieni la data di oggi
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Riferimento alla collezione Firestore delle prenotazioni
            const reservationsRef = admin.firestore().collection(ReservationsCollection);

            // Esegui la query per ottenere le prenotazioni in attesa per l'utente
            const snapshot = await reservationsRef
                .where("user.uid", "==", userId)
                .get();

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


const updateReservationStatus_stg = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const { reservationId, reservationStatus } = req.body.data || req.body;

            if (!reservationId || !reservationStatus) {
                return res.status(400).send({ message: "Missing reservationId or reservationStatus" });
            }

            const reservationRef = admin.firestore().collection(ReservationsCollection).doc(reservationId);
            const reservationDoc = await reservationRef.get();

            if (!reservationDoc.exists) {
                return res.status(404).send({ message: "Reservation not found" });
            }

            await reservationRef.update({ bookStatus: reservationStatus });

            return res.status(200).send({
                message: "Reservation status updated successfully",
                reservationId: reservationId,
                newStatus: reservationStatus
            });

        } catch (error) {
            console.error("Error updating reservation:", error);
            return res.status(500).send({ message: "Internal Server Error", error: error.message });
        }
    });
})




module.exports = { getReservationsWaitingByUserId_stg, updateReservationStatus_stg };
