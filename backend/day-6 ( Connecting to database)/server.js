const app = require("./src/app.js");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb://Siddhartha:lmf7x3IKpSKyBhex@ac-tebfd2y-shard-00-00.vmrwbts.mongodb.net:27017,ac-tebfd2y-shard-00-01.vmrwbts.mongodb.net:27017,ac-tebfd2y-shard-00-02.vmrwbts.mongodb.net:27017/?ssl=true&replicaSet=atlas-12uiv3-shard-0&authSource=admin&appName=Cluster0/day-6",
    )
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error("Connection error:", err);
    });
}

connectToDb();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
