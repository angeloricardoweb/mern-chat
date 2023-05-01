const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { User } = require("./src/models/User");

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const createdUser = await User.create({
      username,
      password,
    });

    jwt.sign(
      { userId: createdUser._id },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Something went wrong" });
        }
        return res.cookie("token", token).status(201).json({ token });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
