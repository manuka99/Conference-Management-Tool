const express = require("express");
const router = express.Router();
const RequestController = require("../controllers/workshopController");

//create new proposal
router.post("/addReq", RequestController.newRequest);

//fetchAll
router.get("/", RequestController.all);

module.exports = router;
