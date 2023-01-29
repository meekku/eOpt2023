/*
Name: authentication.ts

Description: All middlewares related to (user) authentication.

Author: Johannes Natunen, https://github.com/jopu-n
*/

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { config } from "../config/config";

// Authenticates JWT from coming requests
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]; // Takes the Authorization header from request
  const token = authHeader && authHeader.split(" ")[1]; // Takes the token from the header
  if (token == null) return res.sendStatus(401); // If token is undefined, send 401 response

  // Verify that token is valid
  jwt.verify(token, config.jwt.key, (err, user) => {
    if (err) res.sendStatus(403); // If an error occurs, send 403 response
    req.body.user = user; // the user is the same as the user from the request
    next(); // Move to the next middleware
  });
};

// Bundle all authentication middleware into one exportable object
const authentication = {
  authenticateToken: authenticateToken
};

export default authentication;
