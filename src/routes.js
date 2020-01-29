const { Router } = require("express");

const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");
const EstabelecimentosController = require("./controllers/EstabelecimentosController");
const SearchController = require("./controllers/SearchController");

const auth = require("./middleware/auth");

const routes = Router();

routes.post("/users", UserController.store);
routes.post("/login", LoginController.store);

routes.use(auth);

routes.post("/estabelecimentos", EstabelecimentosController.store);
routes.get("/estabelecimentos", EstabelecimentosController.index);
routes.delete("/estabelecimentos/:_id", EstabelecimentosController.delete);
routes.put("/estabelecimentos/:_id", EstabelecimentosController.update);
routes.get("/estabelecimentos/:_id", EstabelecimentosController.show);
routes.get("/search", SearchController.index);

module.exports = routes;
