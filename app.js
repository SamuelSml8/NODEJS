const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://samuel8:t4ImxkPNMXAhIrLt@users-nodejs.eyxgrp5.mongodb.net/"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  // Model
  userSchema = mongoose.Schema({
    name: String,
    last_name: String,
  });

  const usuarios = mongoose.model("usuarios", userSchema);

  const app = express();
  app.use(express.json());

  //* LOGIC OPERATORS MONGODB
  // $eq es equivalent
  app.get("/api/users/age/eq", async (req, res) => {
    const users = await usuarios.find({ age: { $eq: 20 } });
    res.json({
      ok: true,
      message: "Users with age 20 found",
      data: users,
    });
  });

  // $ne (Todas las age que no sean 20)
  app.get("/api/users/age/ne", async (req, res) => {
    const users = await usuarios.find({ age: { $ne: 20 } });
    res.json({
      ok: true,
      message: "Users with age diferent 20 found",
      data: users,
    });
  });

  // $gt (Mayor que 20)
  app.get("/api/users/age/gt", async (req, res) => {
    const users = await usuarios.find({ age: { $gt: 20 } });
    res.json({
      ok: true,
      message: "Users with age greater than 20 found",
      data: users,
    });
  });

  // $gte (Mayor o igual que 20)
  app.get("/api/users/age/gte", async (req, res) => {
    const users = await usuarios.find({ age: { $gte: 20 } });
    res.json({
      ok: true,
      message: "Users with age greater than or equal to 20 found",
      data: users,
    });
  });

  // $lt (Menor que 20)
  app.get("/api/users/age/lt", async (req, res) => {
    const users = await usuarios.find({ age: { $lt: 20 } });
    res.json({
      ok: true,
      message: "Users with age less than 20 found",
      data: users,
    });
  });

  // $lte (Menor o igual que 20)
  app.get("/api/users/age/lte", async (req, res) => {
    const users = await usuarios.find({ age: { $lte: 20 } });
    res.json({
      ok: "true",
      message: "Users with age less than or equal to 20 found",
      data: users,
    });
  });

  // $in (Busca documentos donde el valor de un campo se encuentra dentro de una lista)
  app.get("/api/users/age/in", async (req, res) => {
    const users = await usuarios.find({ age: { $in: [5, 10, 15] } });
    res.json({
      ok: true,
      message: "Users with age 5, 10 or 15 found",
      data: users,
    });
  });

  //   $exists (Busca documentos y valida si existe un campo)
  app.get("/api/users/age/exists", async (req, res) => {
    const users = await usuarios.find({ age: { $exists: true } });
    res.json({
      ok: true,
      message: "Users with age found",
      data: users,
    });
  });

  app.listen(3001, function () {
    console.log("Server running on localhost:3001");
  });
});
