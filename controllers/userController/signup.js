const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const login = require("./login");
async function signup(body) {
  try {
    const { username, email, password } = body;
    const candidateEmail = await User.findOne({ email });
    if (candidateEmail) {
      return { status: 400, code: "user_exists" };
    }
    const candidateName = await User.findOne({ username });
    if (candidateName) {
      return { status: 400, code: "user_exists" };
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
