import { Router } from "../router/Router.js";
import { checkIsValidBody } from "./validBody.js";
import { validUUID } from "./validUUID.js";
import { generateUUID } from "./generateUUID.js";

export const router = new Router();

const users = [];

router.get("/api/users", (_, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/users/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const isValidID = validUUID(userId);
    if (!isValidID) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const currentUser = users.find((item) => item.id === userId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ error: `Record with id === ${userId} doesn't exist` });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/users", (req, res) => {
  try {
    const user = req.body;
    const validationResult = checkIsValidBody(user);

    if (!validationResult.isValid) {
      return res.status(400).json({ error: validationResult.error });
    }

    user.id = generateUUID();
    users.push(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/api/users/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const isValidID = validUUID(userId);
    if (!isValidID) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const index = users.findIndex((item) => item.id === userId);
    if (index === -1) {
      return res
        .status(404)
        .json({ error: `Record with id === ${userId} doesn't exist` });
    }

    const newData = req.body;
    const validationResult = checkIsValidBody(newData);

    if (!validationResult.isValid) {
      return res.status(400).json({ error: validationResult.error });
    }

    users[index] = { ...users[index], ...newData };
    res.status(200).json(users[index]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/api/users/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const isValidID = validUUID(userId);
    if (!isValidID) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const index = users.findIndex((item) => item.id === userId);
    if (index === -1) {
      return res
        .status(404)
        .json({ error: `Record with id === ${userId} doesn't exist` });
    }

    users.splice(index, 1);
    res.status(204).json({ message: `${userId} is deleted` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
