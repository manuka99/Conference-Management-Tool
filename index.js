const cors = require("cors");
const body_parser = require("body-parser");
const express = require("express");
const { connect } = require("mongoose");
const passport = require("passport");

// app constants
const { DB, PORT } = require("./config");

// init the app
const app = express();

app.use(body_parser.json());
app.use(cors());

// middlewares
app.use(passport.initialize());
require("./middlewares/Passport")(passport);

// Auth routes
app.use("/api/auth", require("./routes/AuthRoutes"));

const startApp = async () => {
  try {
    // connect with db
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to database");

    // start server listening
    await app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
  } catch (e) {
    console.error("Database connectivity failed", error);
    startApp();
  }
};

// start the app
startApp();
