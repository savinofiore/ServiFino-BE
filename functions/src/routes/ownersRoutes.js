const express = require("express");
const { validateReqOwner } = require("../middlewares/ownersValidateRequest");
const { addOwner, updateOwner} = require("../controllers/ownersController");
const router = express.Router();


// Applica il middleware per validare i dati nelle rotte
router.post("/add", validateReqOwner, addOwner);
router.post("/update", validateReqOwner, updateOwner);

module.exports = router;