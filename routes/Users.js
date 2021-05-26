const router = require("express").Router();

const {
    userRegistration,
    userLogin,
    userAuth,
    checkRole,
    serializeUser,
} = require("../util/Auth");

// user registration
router.post("/register", async(req, res) => {
    await userRegistration(req.body, "user", res);
});

// user login
router.post("/login", async(req, res) => {
    await userLogin(req.body, res);
});

// user profile route
router.get("/profile", userAuth, async(req, res) => {
    return res.json(req.user);
});

// Admin route
router.get("/admin", userAuth, checkRole(["admin"]), async(req, res) => {
    return res.json("Hello admin");
});

module.exports = router;