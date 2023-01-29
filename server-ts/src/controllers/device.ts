import { NextFunction, Request, Response } from "express";

import models from "../models";

const createUserDevice = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return models.User.findById(userId)
    .then((user) => {
      if (user) {
        user.devices.push(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((err) => res.status(500).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const getUserDevice = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const { deviceId } = req.body;

  const device = await models.User.findById(userId)
    .then((user) => (user ? user.devices.find((device) => device._id == deviceId) : res.status(404).json({ message: "Not Found" })))
    .catch((error) => res.status(500).json({ error }));

  if (!device) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.status(201).json({ device });
};

const getAllUserDevices = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return await models.User.findById(userId)
    .then((user) => (user ? res.status(200).json(user.devices) : res.status(404).json({ message: "Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

const updateUserDevice = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const { newName, newEnergyUsage, newFlexible, newFlexibleTime, newStartingTime, newDuration, deviceId } = req.body;

  await models.User.findOneAndUpdate(
    { "devices._id": deviceId },
    {
      $set: {
        "devices.name": newName,
        "devices.energyUsage": newEnergyUsage,
        "devices.flexible": newFlexible,
        "devices.flexibleTime": newFlexibleTime,
        "devices.startingTime": newStartingTime,
        "devices.duration": newDuration
      }
    }
  )
    .then(() => {
      return res.status(201).json(models.User.findById(userId));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong. " });
    });
};

const deleteUserDevice = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const { deviceId } = req.body;

  await models.User.findById(userId)
    .then((user) => {
      if (user) {
        let deviceIndex = user.devices.findIndex((device) => device._id == deviceId);
        user.devices.splice(deviceIndex, 1);
        user.save().then(() => {
          return res.status(201).json({ message: "Successfully deleted device ", user });
        });
      }
      if (!user) return res.status(404).json({ message: "Couldn't find user. " });
    })
    .catch((err) => res.status(500).json({ err }));
};

export default { createUserDevice, getUserDevice, getAllUserDevices, updateUserDevice, deleteUserDevice };
