const cors = require("cors");
const body_parser = require("body-parser");
const express = require("express");
const { connect } = require("mongoose");
const passport = require("passport");
const { RevokeTokenValidator } = require("./middlewares/RevokeTokenValidator");
const { DB, PORT } = require("./config");
const { SaveToken } = require("./middlewares/SaveToken");
var useragent = require("express-useragent");

// init the app
const app = express();

app.use(body_parser.json());
app.use(cors());
app.use(useragent.express());

// middlewares
// authenticate
app.use(passport.initialize());
require("./middlewares/Passport")(passport);
// token checkup
app.all("*", RevokeTokenValidator);
app.all("*", SaveToken);

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
