const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Bookmark = require("../../models/Bookmark");

async function getMainData(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 400, message: "User is not found" };
    }
    const tables = await Category.find({ owner: userId });
    const allLinks = await Bookmark.find({ owner: userId });
    const userData = { username: user.username, categories: tables, allLinks };
    return { status: 200, data: userData };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { getMainData };
