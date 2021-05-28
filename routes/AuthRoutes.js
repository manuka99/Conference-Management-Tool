const AuthController = require("../controller/AuthController");

const router = require("express").Router();

// user registration
router.post("/register", AuthController.Registration);

// user login
router.post("/login", AuthController.Login);

// recover password
router.post("/recover-password", AuthController.RecoverPassword);

//validate reset token and reset password
router.put("/password-reset/:token", AuthController.ResetPassword);

module.exports = router;
