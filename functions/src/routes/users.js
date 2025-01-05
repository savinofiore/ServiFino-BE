const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/usersController");

// Ottieni tutti gli utenti
router.get("/", getUsers);

// Crea un nuovo utente
router.post("/", createUser);

module.exports = router;
