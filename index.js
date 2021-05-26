const cors = require("cors");
const body_parser = require("body-parser");
const express = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const passport = require("passport");

// app constants
const { DB, PORT } = require("./config");

// init the app
const app = express();

// middlewares
app.use(body_parser.json());
app.use(cors());
app.use(passport.initialize());

require("./middlewares/Passport")(passport);

// user router middleware
app.use("/api/users", require("./routes/Users"));

const startApp = async() => {
    try {
        // connect with db
        await connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        success({
            message: `Successfully connected to the database \n${DB}`,
            badge: true,
        });

        // start server listening
        await app.listen(PORT, () =>
            success({ message: `Server started on port ${PORT}`, badge: true })
        );
    } catch (e) {
        error({
            message: `Failed to connect the database \n${err}`,
            badge: true,
        });
        startApp();
    }
};

startApp();