const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtGen = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

class UserController {
  async registration(req, res) {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      throw new Error("Недостаточно информации");
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw new Error("user already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwtGen(user);
    return res.json(token);
  }

  async login(req, res) {
    const { email, username, password } = req.body;
    const user = await User.findOne({ where: { email, username } });
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Error("Неправильный пароль");
    }
    const token = jwtGen(user);
    return res.json(token);
  }

  async check(req, res) {
    const token = jwtGen(req.user);
    return res.json({ token });
  }
}

module.exports = new UserController();
