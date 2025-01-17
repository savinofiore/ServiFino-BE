const express = require("express");
const {addWorker} = require("../controllers/workersController");
const {validateAddWorker} = require("../middlewares/workersValidateRequest");
const router = express.Router();


router.post("/add", validateAddWorker ,addWorker);

module.exports = router;