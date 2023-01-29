import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import models from "../models";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: "Please input a username and password." });
  }

  // Check if username already in use
  let userExists = await models.User.findOne({ username })
    .exec()
    .catch((err) => {
      console.error(err);
      return res.status(400).json("Something went wrong while finding user");
    });

  if (userExists) {
    res.status(401).json({ message: "Username is already in use." });
    return;
  }

  // Define salt rounds
  const saltRounds = 10;

  // Hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw new Error("Internal Server Error");

    // Create a new user
    let user = new models.User({
      username,
      password: hash,
      devices: [],
      _id: new mongoose.Types.ObjectId()
    });

    // Save user to database
    user
      .save()
      .then(() => {
        res.json({ message: "User created successfully", user });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json("Something went wrong while saving user");
      });
  });
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return models.User.findById(userId)
    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: "Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return models.User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((err) => res.status(500).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return models.User.findByIdAndDelete(userId)
    .then((user) => (user ? res.status(201).json({ message: "User deleted." }) : res.status(404).json({ message: "Not found" })))
    .catch((err) => res.status(500).json({ err }));
};

export default { createUser, getUser, updateUser, deleteUser };
