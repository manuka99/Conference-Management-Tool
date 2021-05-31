const cors = require("cors");
const body_parser = require("body-parser");
const express = require("express");
const { connect } = require("mongoose");
const { DB, PORT } = require("./config");
var useragent = require("express-useragent");
const { Authenticate } = require("./middlewares/Authenticate");

// init the app
const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(useragent.express());

// middlewares
// authenticate
app.all("*", Authenticate);

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
