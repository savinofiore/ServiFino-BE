const express = require("express");
const { validateAddOwner} = require("../middlewares/ownersValidateRequest");
const { addOwner } = require("../controllers/ownersController");
const router = express.Router();


// Applica il middleware per validare i dati nelle rotte
router.post("/add", validateAddOwner, addOwner);

module.exports = router;