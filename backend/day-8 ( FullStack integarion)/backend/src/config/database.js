const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to DB successfully");
    })
    .catch((err) => {
      console.log("error: ", err);
    });
}

module.exports = connectToDB;
