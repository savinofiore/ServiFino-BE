const express = require("express");
const {addWorker, updateWorker} = require("../controllers/workersController");
const {validateAddWorker, validateUpdateWorker} = require("../middlewares/workersValidateRequest");
const router = express.Router();


router.post("/add", validateAddWorker ,addWorker);
router.post("/update", validateUpdateWorker ,updateWorker);

module.exports = router;