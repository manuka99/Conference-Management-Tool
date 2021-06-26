const cors = require("cors");
const body_parser = require("body-parser");
const express = require("express");
const { connect } = require("mongoose");
const { DB, PORT } = require("./config");
var useragent = require("express-useragent");
const { AppRoutes } = require("./routes");
const { AppMiddlewares } = require("./middlewares");
const { HandleError } = require("./middlewares/HandleError");
const { CustomValidators } = require("./Validation/CustomValidators");

// init the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(useragent.express());

/* MIDDLEWARES */
AppMiddlewares(app);

/* ROUTES */
AppRoutes(app);

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

/* ERRORS */
app.use(HandleError);
