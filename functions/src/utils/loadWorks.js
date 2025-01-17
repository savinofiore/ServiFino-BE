const admin = require("firebase-admin");

let worksSet = new Set(); // Variabile globale per il set dei lavori

// Funzione per caricare i lavori
const loadWorks = async () => {
    const snapshot = await admin.firestore().collection("works").get();
    worksSet = new Set(snapshot.docs.map(doc => doc.id)); // Popola il set con gli ID
};

// Getter per ottenere il set dei lavori
const getWorksSet = () => worksSet;

module.exports = { loadWorks, getWorksSet };
