const express = require("express");
const router = express.Router();
const { validateCreateUser, validateDeleteUser, validateUpdateUser} = require("../middlewares/usersValidateRequests");
const { getUsers, createUser , deleteUser, updateUser} = require("../controllers/usersController");

// Ottieni tutti gli utenti
router.get("/", getUsers);

// Applica il middleware per validare i dati nelle rotte
router.post("/create", validateCreateUser, createUser);
router.post("/delete", validateDeleteUser, deleteUser);
router.post("/update", validateUpdateUser, updateUser);
//router.post("/login", validateLoginUser, loginUser);

module.exports = router;
