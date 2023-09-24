const { Router } = require("express");
const controller = require("../controllers/controller.js");

const router = Router();

// GET /register — клиент регистрируется.
router.post("/signUp", controller.register);

// GET /login — вход в систему.
router.get("/signIn", controller.login);

// // GET /bestPlayers — получить массив игроков, у которых число игр больше 10.
router.get("/bestPlayers", controller.bestPlayers);

// // POST / —  добавление игры.
router.post("/", controller.addNewGame);

module.exports = router;
