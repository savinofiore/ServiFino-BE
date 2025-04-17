const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const v2 = require('firebase-functions/v2');
const User = require("../models/User");

const UsersCollection = require("../utils/collections").UsersCollection_stg;


/*
 * Funzione per creare un utente
*/
const createUser_stg = v2.https.onRequest(async (req, res) => {
    cors( req, res, async properties => {
        try {
            const {
                email,
                password,
                displayName,
                disabled,
                work,
                isOwner,
                isAvailable,
                provinces,
            } = req.body.data || req.body;

            // Crea l'istanza dell'utente tramite la classe User
            const user = new User(
                email,
                password,
                displayName,
                disabled || false,
                work,
                isOwner,
                isAvailable,
                provinces,
            );

            // Crea l'utente in Firebase Authentication
            const createdUser = await admin.auth().createUser(
                    {email: user.email, password: user.password, displayName: user.displayName, disabled: false},
                );

            // Salva i dettagli su Firestore
            await admin.firestore().collection(UsersCollection).doc(createdUser.uid).set({
                ...user.toFirestoreObject(),
                uid: createdUser.uid,
            });

            return res.status(201).send({
                data: {
                    message: "User created successfully",
                    user: {...user.toFirestoreObject(), uid: createdUser.uid},
                },
            });
        } catch (error) {
            console.error("Error creating user:", error.toString());
            return res.status(500).send(
                {data: {error: error.message}}
            );
        }

    });
});

const updateUser_stg = v2.https.onRequest(async (req, res) => {

    cors( req, res, async properties => {
        console.log('Incoming: ', req.body.data );
        try {
            const { userId, displayName, work, isAvailable, provinces } = req.body.data || req.body;

            // Aggiorna i dati in Firebase Authentication
            const updatedUser = await admin.auth().updateUser(userId, {
                displayName: displayName,
            });

            // Aggiorna i dati in Firestore
            const userDocRef = admin.firestore().collection(UsersCollection).doc(userId);
            await userDocRef.update({
                displayName: displayName,
                work: work,
                isAvailable: isAvailable,
                provinces: provinces,
            });

            return res.status(200).send(
                {
                    data: {
                        message: "User updated successfully",
                    }
                }
            );
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).send(
                {data:{ error: error.message }}
            );
        }
    });
});

/*

const deleteUser = v2.https.onRequest(async (req, res) => {
    if (!validateDeleteUser(req, res)) return;

    try {
        const { user, password, confirmedPassword } = req.body.data || req.body;

        // Ricostruisce l'oggetto utente con la classe User
        const userObj = new User(
            user.email,
            password,
            user.displayName,
            user.phoneNumber,
            user.photoURL,
            user.disabled
        );

        // Elimina l'utente da Firebase Authentication
        await admin.auth().deleteUser(user.uid);

        // Prepara l'oggetto da salvare in Firestore (per log)
        const userDoc = userObj.toFirestoreObject();
        userDoc.uid = user.uid;
        await admin.firestore().collection("users").doc(userDoc.uid).set(userDoc);

        return res.status(200).send({
            data: {
                message: "User deleted successfully",
                user: userDoc,
            }
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).send({
            data: { error: error.message }
        });
    }
});



const getUsers = v2.https.onRequest(async (req, res) => {
    if (req.method !== "GET") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    try {
        // Implementa la logica per recuperare gli utenti, ad esempio dalla collection "apis"
        return res.status(200).send({ message: "Elenco utenti", data: [] });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

/*
const loginUser = onRequest(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().getUserByEmail(email);

        // ATTENZIONE: signInWithEmailAndPassword non è presente nell'Admin SDK.
        // Questa parte è solo esemplificativa e il login va normalmente gestito sul client.
        const user = await admin.auth().signInWithEmailAndPassword(email, password);
        const token = await user.getIdToken();

        return res.status(200).send({
            message: "User logged in successfully",
            user: userRecord.toJSON(),
            token: token,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).send({ error: error.message });
    }
});*/

module.exports = { createUser_stg, updateUser_stg /*createUserTest,deleteUser, , getUsers */};

