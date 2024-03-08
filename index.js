const express = require("express");
const moongoose = require("mongoose");

moongoose.connect(
  "mongodb+srv://samuel8:t4ImxkPNMXAhIrLt@users-nodejs.eyxgrp5.mongodb.net/"
);

const db = moongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));

db.once("open", function () {
  console.log("Connected to MongoDB");
  // Model
  userSchema = moongoose.Schema({
    name: String,
    last_name: String,
  });
  const User = moongoose.model("user", userSchema);

  const app = express();
  app.use(express.json());

  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.json(users);
    } catch (error) {
      console.error("object not found", error);
    }
  });
  app.listen(3000, function () {
    console.log("Server started");
  });
});
