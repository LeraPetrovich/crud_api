import { Router } from "../router/Router";

export const router = new Router();

const users = [
  {
    id: "1",
    name: "Lera 1",
  },
  {
    id: "2",
    name: "Lera 2",
  },
];

router.get("/users", (req, res) => {
  res.send(users);
});

router.post("/users", (req, res) => {
  res.send(users);
});
