/*
Name: index.ts

Description: Main server file for the TUAS eOpt app.

Author: Johannes Natunen, https://github.com/jopu-n
*/

import express from "express";
import path from "path";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user";
import apiRouter from "./routes/api";
import deviceRouter from "./routes/device";
import authentication from "./middlewares/authentication";
import { config } from "./config/config";

// Take server port from .env or make it 3001 by default.
const PORT = process.env.PORT || 3001;

// Connect to database, link given in .env
mongoose
  .connect(config.mongodb.url)
  .then(() => {
    console.log("Connected to database.");
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

const startServer = () => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // On data HTTP requests, route the request to
  // [serverUrl]/api/data/<requestName>
  // TODO: require some sort of authentication on data HTTP requests
  app.use("/api/data", apiRouter);

  // On auth HTTP requests, route the request to
  // [serverUrl]/api/auth/<requestName>
  app.use("/api/auth", userRouter);

  app.use("/api/device", deviceRouter);

  // ------- JWT Testing start -------

  const testing = "Successful!!!";

  // Testing of authenticateToken middleware. Description of it
  // found in /middlewares/authentication
  app.get("/testing", authentication.authenticateToken, (req, res) => {
    res.json(testing);
  });

  // ------- JWT Testing end -------

  // Handles any requests that don't match the ones above
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "/app/build/index.html"));
  });

  app.use((req, res, next) => {
    const error = new Error("not found");
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};
