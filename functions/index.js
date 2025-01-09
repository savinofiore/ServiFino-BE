const functions = require("firebase-functions");
const app = require("./src/index"); // Importa l'app principale Express

// Esporta l'app come Firebase Function
exports.api = functions.https.onRequest(app);
