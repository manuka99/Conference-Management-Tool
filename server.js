const express = require("express");
const { PORT } = require("./Config");
const path = require("path");
const { connect } = require("./Startups/Database/index");
const app = require("./app");

const startApp = async () => {
  try {
    // connect with db
    await connect();
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
    app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
  } catch (error) {
    console.error("Database connectivity failed", error.message);
    startApp();
  }
};

// start the app
startApp();
