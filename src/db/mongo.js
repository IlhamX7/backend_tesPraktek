const mongoose = require("mongoose");

const database = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tesPraktek_db";

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", function () {
  console.log("connection error");
});

db.once("open", function () {
  console.log("successfully connection");
});
