import express from "express";

import deviceControllers from "../controllers/device";

const deviceRouter = express.Router();

deviceRouter.post("/add-device/:userId", deviceControllers.createUserDevice);

deviceRouter.get("/get-device/:userId", deviceControllers.getUserDevice);

deviceRouter.get("/get-all-devices/:userId", deviceControllers.getAllUserDevices);

deviceRouter.put("/update-device/:userId", deviceControllers.updateUserDevice);

deviceRouter.delete("/delete-device/:userId", deviceControllers.deleteUserDevice);

export default deviceRouter;
