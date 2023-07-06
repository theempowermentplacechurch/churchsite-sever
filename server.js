const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json({ limit: "500000000mb" }));
app.use(bodyParser.urlencoded({ limit: "500000000mb", extended: true }));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.set("trust proxy", 1);
app.use(express.static("public"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// routes
const userAccess = require("./Route/UserRoute");
const homeItems = require("./Route/HomepageRoute");
const aboutItems = require("./Route/AboutpageRoute");
const eventItems = require("./Route/EventpageRoute");
const sermonItems = require("./Route/SermonRoute");
const Transation = require("./Route/Transaction");
app.use("/api/v1/user", userAccess);
app.use("/api/v1/home", homeItems);
app.use("/api/v1/about", aboutItems);
app.use("/api/v1/event", eventItems);
app.use("/api/v1/sermon", sermonItems);
app.use("/api/v1/transaction", Transation);

const connectDB = require("./Database/DBconnect");
const connectAdminToDataBase = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT || 2222, () => {
      console.log("app is listening on port 2222");
    });
  } catch (error) {
    console.log(error);
  }
};
connectAdminToDataBase();
