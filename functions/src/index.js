/*const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const express = require("express");
const app = express();

// Imposta una route di esempio
app.get("/", (req, res) => {
    res.send("Ciao, benvenuto su ServiFino API!");
});

// Esporta il server Express come Firebase Function
exports.api = functions.https.onRequest(app);

*/
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotte principali
const userRoutes = require("./routes/users");
//const bookingRoutes = require("./routes/bookings");
//const workerRoutes = require("./routes/workers");

app.use("/users", userRoutes);
//app.use("/bookings", bookingRoutes);
//app.use("/workers", workerRoutes);

// Esportiamo l'app come Firebase Function
exports.api = functions.https.onRequest(app);
