const mongoose = require("mongoose");

const dbConnect = () => {
  const uri = `${process.env.MONGO_URI}/app`;
  mongoose.connect(uri, {}, (err, res) => {
    if (!err) {
      console.log("**** CONEXION DB CORRECTA ****");
    } else {
      console.log(err);
    }
  });
};

module.exports = dbConnect;
