const express = require ('express');
const router = express.Router();
const interestController = require('../Controllers/interestControll');


module. exports = function () {
router.post('/create', interestController.createInterestField);
router.get('/',interestController.getAllInterestFields);


return router;
}