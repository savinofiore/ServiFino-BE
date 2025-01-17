const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
//Utils
const {loadWorks} = require("./utils/loadWorks");
// Routes
const usersRoutes = require("./routes/usersRoutes");
const workersRoutes = require("./routes/workersRoutes");
const startServer = require("./utils/startServer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Inizializza Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Funzione per caricare i lavori e avviare il server solo dopo
/*async function startServer() {
    try {
        // Carica il set di lavori
        await loadWorks();
        console.log("Works set loaded successfully!");



    } catch (error) {
        console.error("Error loading works set:", error);
        process.exit(1); // Termina l'esecuzione del server in caso di errore
    }
}*/
const start = startServer();

// Endpoints
app.use("/users", usersRoutes);
app.use("/workers", workersRoutes);


//Exports
module.exports.admin = admin;
module.exports.db = db;
module.exports.start = start;
module.exports = app;

