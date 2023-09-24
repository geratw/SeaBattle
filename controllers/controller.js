const { Sequelize } = require("sequelize");
const { Game, User } = require("../models");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "The username is already taken" });
    }
    const newUser = await User.create({
      username,
      password,
      games_played: [],
      counter_games_win: 0,
    });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const isPasswordMatch = user.password === password;
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
      attributes: ["username", "counter_games_win", "games_played"],
      where: {
        games_played: {
          [Sequelize.Op.and]: [
            { [Sequelize.Op.ne]: null },
            Sequelize.where(Sequelize.fn("array_length", Sequelize.col("games_played"), 1), ">", 10),
          ],
        },
      },
    });
    const updatedBestPlayers = bestPlayers.map((player) => {
      return {
        username: player.username,
        counter_game: player.games_played.length,
        counter_win: player.counter_games_win,
        counter_loss: player.games_played.length - player.counter_games_win,
      };
    });
    res.json({ bestPlayers: updatedBestPlayers });
  } catch (error) {
    console.error("Error fetching best players:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addNewGame = async (req, res) => {
  const { user_id, isWin } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newGame = await Game.create({
      user_id,
      isWin,
    });
    let gamesPlayed = user.games_played || [];
    gamesPlayed.push(newGame.id);
    await user.update({
      games_played: sequelize.literal(`ARRAY[${gamesPlayed}]::INTEGER[]`),
      counter_games_win: isWin ? (user.counter_games_win || 0) + 1 : user.counter_games_win,
    });
    res.json(newGame);
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.myStats = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    const gamesPlayed = user.games_played ? user.games_played.length : 0;
    const gamesWin = user.counter_games_win || 0;
    const gamesLost = gamesPlayed - gamesWin;
    const username = user.username;
    const stats = {
      username,
      gamesPlayed,
      gamesWin,
      gamesLost,
    };
    res.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
