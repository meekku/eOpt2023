/*
Name: userRoutes.ts

Description: API endpoints regarding the users.
Example use: POST [url]/api/auth/sign-up
Example post body (in JSON):
{
  "username":"Test",
  "password":"test"
}

Author: Johannes Natunen, https://github.com/jopu-n
*/

import express, { Request, Response } from "express";
// Import bcrypt for password hashing purposes
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Import models for user creation
import models from "../models/index";
import { config } from "../config/config";
import user from "../controllers/user";

const userRouter = express.Router();

// Endpoint for creating a user.
// URL: [url]/api/auth/sign-up
userRouter.use("/sign-up", user.createUser);

// Endpoint for signing in.
// URL: [url]/api/auth/sign-in
userRouter.post("/sign-in", async (req, res) => {
  // Extract username and password from req.body object
  const { username, password } = req.body;

  // Check if user exists in database
  let user = await models.User.findOne({ username })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  if (!user) {
    return res.status(401).json({ message: "Cannot find account with given username" });
  }

  // Comparing if hashed password and password in DB match.
  bcrypt.compare(password, user.password, (err, result) => {
    // If passwords match:
    if (result) {
      if (!user) {
        return res.status(401).json({ message: "Cannot find account with given username" });
      }
      // Create a JWT for user
      const jwtUser = {
        name: username,
        pass: user.password
      };
      // Creating a new JWT using jwt.sign, our user info and secret key in .env
      const accessToken = jwt.sign(jwtUser, config.jwt.key);

      // Return a "success" message and the JWT
      return res.status(200).json({
        message: "User logged in successfully.",
        accessToken: accessToken
      });
    }

    if (err) console.log(err);
    return res.status(401).json({ message: "Invalid Password." });
  });
});

export default userRouter;
