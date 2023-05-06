const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { User } = require("./src/models/User");

const bcryptSalt = bcrypt.genSaltSync(10);

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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  } else {
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Something went wrong" });
        }
        return res
          .cookie("token", token)
          .status(200)
          .json({ token, username: user.username, id: user._id });
      });
    }
  }
});

app.get("/profile", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return res.json({ username: user.username, id: user._id });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
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
      password: bcrypt.hashSync(password, bcryptSalt),
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
