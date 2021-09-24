import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

// endpoint for users
const users = express.Router();
// this has to be after users is defined as the route
app.use("/api/users", users);

// get users
users.get("/", async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
});

// for post method
users.use(express.json()); // must be before post method

// adding a new user
users.post("/", async (req, res) => {
  // 'hey database, do this'
  res.status(201).json(await db.addUser(req.body));
});

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
