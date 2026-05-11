const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("successfully connected to DB");
    })
    .catch((err) => {
      console.log("error: ", err);
    });
}

module.exports = connectToDB;
