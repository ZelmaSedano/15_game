import express from "express";

import * as db from "./db.mjs";

const userRouter = express.Router();

// get users
userRouter.get("/", async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
});

// MUST INCLUDE for post method
userRouter.use(express.json()); // must be before post method

// adding a new user
userRouter.post("/", async (req, res) => {
  // 'hey database, do this'
  res.status(201).json(await db.addUser(req.body));
});

export default userRouter;
