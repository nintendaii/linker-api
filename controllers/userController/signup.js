const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const login = require("./login");
async function signup(body) {
  try {
    const { username, email, password } = body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return { status: 400, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let user = new User({ username, email, password: hashedPassword });
    await user.save();
    const result = await login.login({ email, password });
    console.log(result);
    return result;
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { signup };
