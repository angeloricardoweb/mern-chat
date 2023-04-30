const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { User } = require("./models/User");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/register", async (req, res) => {
  //   const { username, password } = req.body;
  await User.create({
    username: "test2",
    password: "test",
  });

  return res.json({ message: "User created" });
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
