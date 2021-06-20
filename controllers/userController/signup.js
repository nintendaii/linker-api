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
    return { status: 200, code: "user_created" };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { signup };
