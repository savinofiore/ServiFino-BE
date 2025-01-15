const express = require("express");
const router = express.Router();
const { validateCreateUser, validateDeleteUser} = require("../middlewares/validateRequest");
const { getUsers, createUser , deleteUser} = require("../controllers/usersController");

// Ottieni tutti gli utenti
router.get("/", getUsers);

// Applica il middleware validateCreateUser solo alla rotta /create
router.post("/create", validateCreateUser, createUser);
router.post("/delete", validateDeleteUser, deleteUser);

module.exports = router;
