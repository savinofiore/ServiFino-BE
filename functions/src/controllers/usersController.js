const admin = require("firebase-admin");
const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        const { email, password, displayName, phoneNumber, photoURL, disabled, assignment, work , isOwner, isAvailable} = req.body;
        // Crea l'istanza dell'utente usando la classe User
        const user = new User(email, password, displayName, phoneNumber, photoURL, disabled, assignment, work, isOwner, isAvailable);
        // Crea l'utente in Firebase Authentication
        const createdUser = await admin.auth().createUser(user.toFirebaseAuthObject());
        // Salva i dettagli nel database Firestore
        await admin.firestore().collection("users").doc(createdUser.uid).set({
            ...user.toFirestoreObject(), // Metodo aggiunto alla classe User
            uid: createdUser.uid, // Includi l'UID generato da Firebase Auth
        });
        // Restituisce i dettagli dell'utente
        return res.status(201).send({
            message: "User created successfully",
            user: { ...user.toFirestoreObject(), uid: createdUser.uid },
        });
    } catch (error) {
        console.error("Error creating user:", error.toString());
        return res.status(500).send({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user, password, confirmedPassword } = req.body;
        // Usa la classe User per raccogliere i dati dell'utente da eliminare
        const userObj = new User(user.email, password, user.displayName, user.phoneNumber, user.photoURL, user.disabled);
        // Elimina l'utente da Firebase Authentication
        const deletedUser = await admin.auth().deleteUser(user.uid);
        // Crea l'oggetto da salvare in Firestore
        const userDoc = userObj.toFirestoreObject();
        userDoc.uid = deletedUser.uid; // Aggiungi UID generato da Firebase
        // Salva l'utente nel database Firestore (in caso di necessità di log)
        await admin.firestore().collection("users").doc(userDoc.uid).set(userDoc);
        // Restituisce il risultato dell'eliminazione
        return res.status(200).send({
            message: "User deleted successfully",
            user: userDoc,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).send({ error: error.message });
    }
};

//da rivedere
const updateUser = async (req, res) => {
    try {
        // Estrai i dati dalla richiesta
        const { user, displayName, phoneNumber , work, isAvailable} = req.body;
        // Aggiorna i dati dell'utente in Firebase Authentication
        const updatedUser = await admin.auth().updateUser(user.uid, {
            displayName: displayName,
            phoneNumber: phoneNumber,
        });
        // Aggiorna i dati nel database Firestore
        const userDocRef = admin.firestore().collection("users").doc(user.uid);
        await userDocRef.update({
            displayName: displayName,
            phoneNumber: phoneNumber,
            work: work,
            isAvailable: isAvailable,
        });
        // Restituisci il risultato
        return res.status(200).send({
            message: "User updated successfully",
            user: {
                uid: updatedUser.uid,
                displayName: updatedUser.displayName,
                phoneNumber: updatedUser.phoneNumber,
                work: work,
                isAvailable: isAvailable,
            },
        });
    } catch (error) {
        console.error("Error updating user:", error);
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Autenticazione utente con Firebase
        const userRecord = await admin.auth().getUserByEmail(email);
        // Prova a fare il login con la password dell'utente
        const user = await admin.auth().signInWithEmailAndPassword(email, password);
        // Se il login ha successo, restituisci un token o i dettagli dell'utente
        const token = await user.getIdToken();
        return res.status(200).send({
            message: "User logged in successfully",
            user: userRecord.toJSON(),
            token: token, // Restituisci il token per autenticazione futura
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).send({ error: error.message });
    }
};


module.exports = { createUser , getUsers, deleteUser, updateUser, loginUser };
