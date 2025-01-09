const admin = require("firebase-admin");
const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).send({ error: "Method Not Allowed" });
        }

        const { email, password, displayName, phoneNumber, photoURL, disabled } = req.body;

        if (!email || !password || !displayName) {
            return res.status(400).send({
                error: "Email, password, and displayName are required",
            });
        }

        // Usa la nuova classe User
        const user = new User(email, password, displayName, phoneNumber, photoURL, disabled);

        // Crea l'utente in Firebase Authentication
        const createdUser = await admin.auth().createUser(user.toFirebaseAuthObject());

        // Salva l'utente in Firestore
        const userDoc = {
            uid: createdUser.uid,
            email: createdUser.email,
            displayName: createdUser.displayName,
            phoneNumber: createdUser.phoneNumber,
            photoURL: createdUser.photoURL,
            disabled: createdUser.disabled,
        };

        // Salva i dettagli nel database Firestore
        await admin.firestore().collection("users").doc(createdUser.uid).set(userDoc);

        // Restituisce i dettagli dell'utente
        return res.status(201).send({
            message: "User created successfully",
            user: userDoc,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        // Logica per recuperare gli utenti (ad esempio, da Firestore)
        res.status(200).send({ message: "Elenco utenti", data: [] });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
module.exports = { createUser , getUsers };
