const express = require("express");
const router = express.Router();
const { validateCreateUser } = require("../middlewares/validateRequest");
const { getUsers, createUser } = require("../controllers/usersController");

// Ottieni tutti gli utenti
router.get("/", getUsers);

// Applica il middleware validateCreateUser solo alla rotta /create
router.post("/create", validateCreateUser, createUser);

module.exports = router;
