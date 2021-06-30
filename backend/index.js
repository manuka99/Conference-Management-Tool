const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT|| 8075;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology : true,
    useFindAndModify:false

});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB.");
})

const proposalRoute = require("./routes/proposalRoute");
app.use("/proposal", proposalRoute);
const workshopRoute = require("./routes/registerRoute");
app.use("/workshop", workshopRoute);
const conferenceRoute = require("./routes/conferenceRoute");
app.use("/conference", conferenceRoute);

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})


