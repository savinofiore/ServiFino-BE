const express = require("express");
const {addWorker, updateWorker} = require("../controllers/workersController");
const { validateReqWorker } = require("../middlewares/workersValidateRequest");
const router = express.Router();


router.post("/add", validateReqWorker ,addWorker);
router.post("/update", validateReqWorker ,updateWorker);

module.exports = router;