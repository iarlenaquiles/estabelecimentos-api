const { Router } = require("express");

const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");

const auth = require("./middleware/auth");

const routes = Router();

routes.post("/users", UserController.store);
routes.post("/login", LoginController.store);

routes.use(auth);

module.exports = routes;
