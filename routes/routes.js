const { Router } = require("express");
const controller = require("../controllers/controller.js");

const router = Router();

// GET /register — клиент регистрируется.
router.post("/api/signUp", controller.register);

// GET /login — вход в систему.
router.get("/api/signIn", controller.login);

// // GET /bestPlayers — получить массив объектов игроков, у которых число игр больше 10.
router.get("/api/bestPlayers", controller.bestPlayers);

// // POST / —  добавление игры.
router.post("/api/", controller.addNewGame);

// // get /myStats/:user_id — получение данных о пользователе.
router.get("/api/myStats/:user_id", controller.myStats);

module.exports = router;
