/*
Name: user.ts

Description: User model for Mongo database.

Author: Johannes Natunen, https://github.com/jopu-n
*/

import mongoose, { Schema } from "mongoose";

interface IDevice {
  _id: mongoose.Types.ObjectId;
  name: string;
  energyUsage: number;
  flexible: boolean;
  flexibleTime: number;
  startingTime: string;
  duration: number;
}

interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  devices: mongoose.Types.DocumentArray<IDevice>;
}

// Making a mongoose schema for the user
const userSchema: Schema = new mongoose.Schema<IUser>({
  // Requirements for the username
  username: {
    type: String,
    required: [true, "Username is required"],
    validate: {
      validator: (value: string) => {
        return value.length >= 3;
      },
      message: () => "Username must be at least three characters long"
    }
  },

  // Requirements for the password
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value: string) => {
        return value.length >= 6;
      },
      message: () => "Password must be at least six characters long"
    }
  },
  devices: [
    {
      name: { type: String },
      energyUsage: { type: Number },
      flexible: { type: Boolean },
      flexibleTime: { type: Number },
      startingTime: { type: String },
      duration: { type: Number }
    }
  ]
  // Add additional parameters here if needed
});

// Make a mongoose model with user schema.
const User = mongoose.model<IUser>("User", userSchema);

export default User;
