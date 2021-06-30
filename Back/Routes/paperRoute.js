const express = require ('express');
const router = express.Router();
const paperController = require('../Controllers/paperControll');

module. exports = function () {
    router.post('/create', paperController.createPaper);
    router.get('/all', paperController.getAllPapers);
    router.get('/:id', paperController.getOnePaper);
    router.patch('/update/:id', paperController.updatePapers);
    router.delete('/delete/:id', paperController.deletePapers);
    return router;
    }

