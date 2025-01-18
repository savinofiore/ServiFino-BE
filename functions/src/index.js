const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
// Routes
const usersRoutes = require("./routes/usersRoutes");
const workersRoutes = require("./routes/workersRoutes");
const ownersRoutes = require("./routes/ownersRoutes");
const startServer = require("./utils/startServer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Inizializza Firebase Admin
admin.initializeApp();
const db = admin.firestore();

try{
    startServer(admin);
} catch (e) {
    console.error('Error starting server', e);
}

// Endpoints
app.use("/users", usersRoutes);
app.use("/workers", workersRoutes);
app.use("/owners", ownersRoutes)

//Exports
module.exports.admin = admin;
module.exports.db = db;
module.exports = app;

