const admin = require("firebase-admin");
const db = admin.firestore();

const createUser = async (user) => {
    const userRef = db.collection("users").doc();
    await userRef.set(user);
    return { id: userRef.id, ...user };
};

const getUsers = async () => {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

module.exports = { createUser, getUsers };
