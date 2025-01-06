const admin = require("firebase-admin");
const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).send({ error: "Method Not Allowed" });
        }

        const { email, password, displayName, phoneNumber } = req.body;

        if (!email || !password || !displayName) {
            return res.status(400).send({ error: "Email, password, and displayName are required" });
        }

        const user = new User(email, password, displayName, phoneNumber);

        const createdUser = await admin.auth().createUser(user.toFirebaseAuthObject());

        return res.status(201).send({
            message: "User created successfully",
            user: {
                uid: createdUser.uid,
                email: createdUser.email,
                displayName: createdUser.displayName,
                phoneNumber: createdUser.phoneNumber,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({ error: error.message });
    }
};

//funzione da implementare
/*const admin = require("firebase-admin");
const { db } = require("../config/firebase"); // Importa la configurazione di Firestore

const createUser = async (req, res) => {
    const { email, password, displayName, phoneNumber } = req.body;

    try {
        // Crea l'utente in Firebase Authentication
        const createdUser = await admin.auth().createUser({
            email,
            password,
            displayName,
            phoneNumber,
        });

        // Salva i dettagli dell'utente nella tabella "users" in Firestore
        const userDoc = {
            uid: createdUser.uid,
            email: createdUser.email,
            displayName: createdUser.displayName,
            phoneNumber: createdUser.phoneNumber || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await db.collection("users").doc(createdUser.uid).set(userDoc);

        // Restituisce la risposta con i dettagli dell'utente
        return res.status(201).send({
            message: "User created successfully",
            user: userDoc,
        });
    } catch (error) {
        console.error("Errore durante la creazione dell'utente:", error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { createUser };
*/

const getUsers = async (req, res) => {
    try {
        // Logica per recuperare gli utenti (ad esempio, da Firestore)
        res.status(200).send({ message: "Elenco utenti", data: [] });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
module.exports = { createUser , getUsers };
