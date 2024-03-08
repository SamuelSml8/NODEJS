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

  const User = moongoose.model("users", userSchema);
  const Company = moongoose.model("companies", userSchema);

  const app = express();
  app.use(express.json());

  //* GET ALL USERS
  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.json({
        ok: true,
        message: "Users found",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: "Users not found",
        data: error,
      });
      console.error("object not found", error);
    }
  });

  //* GET 10 USERS
  app.get("/api/users/limit", async (req, res) => {
    try {
      const users = await User.find().limit(10);
      console.log(users);
      res.json({
        ok: true,
        message: "Just 10 users found",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: "Users not found",
        data: error,
      });
      console.error("object not found", error);
    }
  });

  //* GET COMPANIES
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await Company.find();
      res.json({
        ok: true,
        message: "Companies found",
        data: companies,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: "Companies not found",
        data: error,
      });
      console.error("object not found", error);
    }
  });

  //* GET USERS THAT WORKS IN COMPANY WITH ID 5
  app.get("/api/users/5", async (req, res) => {
    try {
      const usersCompany5 = await User.find({ empresa_id: 5 });
      res.json({
        ok: true,
        message: "Users works in id company 5 found",
        data: usersCompany5,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: "Users not found",
        data: error,
      });
    }
  });

  app.listen(3000, function () {
    console.log("Server started");
  });
});
