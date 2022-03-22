const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const dbConnect = require("./config/database");

require("dotenv").config();

app.use(cors());

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
