const express = require ('express');
const router = express.Router();
const userController = require('../Controllers/userControll');


module. exports = function () {
router.post('/create', userController.createUser);
router.get('/',userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.get('/field/:id',userController.getInterestsOfUsers);

return router;
}