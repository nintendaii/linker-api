const Bookmark = require("../../models/Bookmark");
const Category = require("../../models/Category");
const User = require("./../../models/User");

async function getAll(id) {
  try {
    const candidate = await User.findById(id);
    if (!candidate) {
      return { status: 404, code: "user_doesnt_exist" };
    }
    const allBookmarks = await Bookmark.find({ owner: id });
    return { status: 200, data: allBookmarks };
  } catch (error) {
    return { status: 400, code: "Something went wrong " + error };
  }
}

module.exports = { getAll };
