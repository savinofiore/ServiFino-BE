const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Inizializza Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Rotte principali
const userRoutes = require("./routes/userRoutes");

//Endpoints
app.use("/users", userRoutes);

module.exports.db = db;
module.exports = app;
