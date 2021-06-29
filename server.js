const cors = require("cors");
const body_parser = require("body-parser");
const express = require("express");
const { connect } = require("mongoose");
const { DB, PORT } = require("./config");
var useragent = require("express-useragent");
const { AppRoutes } = require("./routes");
const { AppMiddlewares } = require("./middlewares");
const { HandleError } = require("./middlewares/HandleError");
const fileUpload = require("express-fileupload");
const path = require("path");

// init the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(useragent.express());
app.use(fileUpload());

/* MIDDLEWARES */
AppMiddlewares(app);

/* ROUTES */
AppRoutes(app);

const startApp = async () => {
  try {
    // connect with db
    await connect(DB, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to database");

    // serve static assests
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("Frontend/build"));
      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "Frontend", "build", "index.html")
        );
      });
    }

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
