const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const { dbConnect } = require("./config/database");
const multer = require("multer");
const path = require("path");
const app = express();

require("dotenv").config();

app.use(cors());

const filesStoage = path.join(__dirname, "storege");
const pathViews = path.join(__dirname, "views");
const pathPublic = path.join(__dirname, "public");

//Config
app.set("views", pathViews);
app.set("view engine", "ejs");

//Middlewares
app.use(express.static(pathPublic));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ dest: filesStoage }).single("csv"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use("/", require("./routes"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

dbConnect();

//process.on("uncaughtException", dbDisconnect);
