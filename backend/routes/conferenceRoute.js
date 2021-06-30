const express = require("express");
const router = express.Router();
const conferenceController = require("../controllers/conferenceController");

//create new proposal
router.post("/addConf", conferenceController.newConfRequest);

//fetchAll
router.get("/", conferenceController.a11);

module.exports = router;
