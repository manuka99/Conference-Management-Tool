const cors = require("cors");
const express = require("express");
const { connect } = require("mongoose");
const { LOCAL_DB, ATLAS_DB, APP_PORT } = require("./Config");
var useragent = require("express-useragent");
const { AppRoutes } = require("./Routes");
const { AppMiddlewares } = require("./Middlewares");
const { HandleError } = require("./Middlewares/HandleError");
const fileUpload = require("express-fileupload");
const path = require("path");
const PORT = process.env.PORT || APP_PORT;
const DB = process.env.NODE_ENV === "production" ? ATLAS_DB : LOCAL_DB;

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
          path.resolve(__dirname, `Frontend`, `build`, `index.html`)
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
