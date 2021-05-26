const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const passport = require("passport");

// to register user
const userRegistration = async(userData, role, res) => {
    try {
        // validate username
        let usernameNotTaken = await validateUsername(userData.name);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: "Username is already taken",
                success: false,
            });
        }
        // validate email
        let emailNotTaken = await validateEmail(userData.email);
        if (!emailNotTaken) {
            return res.status(400).json({
                message: "Email is already taken",
                success: false,
            });
        }

        // save user

        // get the hashed password
        const hashedPassword = await bcrypt.hash(userData.password, 12);

        // create the user
        const newUser = new User({
            ...userData,
            role,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({
            message: "User has been saved.",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create user account",
            success: false,
        });
    }
};

// to login
const userLogin = async(userCreds, res) => {
    let { email, password } = userCreds;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(500).json({
            message: "Unable match user credentials",
            success: false,
        });
    }
    // match password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(500).json({
            message: "Invalid user password",
            success: false,
        });
    } else {
        // jwt
        let token = jwt.sign({
                user_id: user._id,
                role: user.role,
                name: user.name,
            },
            SECRET, { expiresIn: "7 days" }
        );

        let result = {
            user_id: user._id,
            role: user.role,
            name: user.name,
            token: `Bearer ${token}`,
            expiresIn: 168,
        };
        return res.status(200).json({
            ...result,
            message: "Success user login",
            success: true,
        });
    }
};

// passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

const checkRole = (roles) => (req, res, next) => {
    roles.includes(req.user.role) ?
        next() :
        res.status(401).json({ message: "UnAuthorized", success: false });
};

const validateUsername = async(username) => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

const validateEmail = async(email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const serializeUser = (user) => {
    return {
        name: user.name,
        _id: user._id,
        email: user.email,
        role: user.role,
    };
};
module.exports = {
    userAuth,
    checkRole,
    userRegistration,
    userLogin,
    serializeUser,
};