const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

async function login(body) {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, code: "user_not_found" };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, code: "incorrect_password" };
    }
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign({ payload }, config.get("jwtSecret"));
    return { status: 200, token };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { login };
