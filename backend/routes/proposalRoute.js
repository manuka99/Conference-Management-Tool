const express = require("express");
const router = express.Router();
const proposalController = require("../controllers/proposalController");

//create new proposal
router.post("/add", proposalController.newProposal);

//fetchAll
router.get("/", proposalController.all);

module.exports = router;
