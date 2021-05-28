const AuthController = require("../controller/AuthController");
const { AuthUser } = require("../middlewares/AuthUser");
const router = require("express").Router();

// user registration
router.post("/register", AuthController.Registration);

// user login
router.post("/login", AuthController.Login);

// user login
router.post("/logout", AuthUser, AuthController.Logout);

// recover password
router.post("/recover-password", AuthController.RecoverPassword);

//validate reset token and reset password
router.post("/password-reset/:token", AuthController.ResetPassword);

module.exports = router;
