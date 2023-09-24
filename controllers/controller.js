const { Sequelize } = require("sequelize");
const { Game, User } = require("../models");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким именем
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: "The username is already taken" });
    }

    // Создаем нового пользователя
    const newUser = await User.create({
      username,
      password,
      games_played: [],
      counter_games_win: 0,
    });

    // Возвращаем созданного пользователя в ответе
    res.json(newUser);
  } catch (error) {
    // Обработка ошибок
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Поиск пользователя по имени пользователя
    const user = await User.findOne({ where: { username } });

    if (user) {
      // Проверка совпадения пароля
      const isPasswordMatch = user.password === password;

      // Возвращаем true или false в зависимости от совпадения паролей
      res.json({ success: isPasswordMatch });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.bestPlayers = async (req, res) => {
  try {
    const bestPlayers = await User.findAll({
      attributes: ["id"],
      where: {
        games_played: {
          [Sequelize.Op.and]: [
            { [Sequelize.Op.ne]: null },
            Sequelize.where(Sequelize.fn("array_length", Sequelize.col("games_played"), 1), ">", 10),
          ],
        },
      },
    });

    const bestPlayersIds = bestPlayers.map((player) => player.id);
    res.json({ success: true, bestPlayersIds });
  } catch (error) {
    console.error("Error fetching best players:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addNewGame = async (req, res) => {
  const { user_id, isWin } = req.body;

  try {
    // Проверяем существование пользователя
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Создаем новую игру
    const newGame = await Game.create({
      user_id,
      isWin,
    });

    // Проверяем, что games_played является массивом
    let gamesPlayed = user.games_played || [];

    // Добавляем новую игру в games_played
    gamesPlayed.push(newGame.id);

    // Обновляем games_played в базе данных
    await user.update({
      games_played: sequelize.literal(`ARRAY[${gamesPlayed}]::INTEGER[]`),
      counter_games_win: isWin ? (user.counter_games_win || 0) + 1 : user.counter_games_win,
    });

    // Возвращаем созданную игру в ответе
    res.json(newGame);
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
