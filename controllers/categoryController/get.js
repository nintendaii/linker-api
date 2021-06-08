const Category = require("../../models/Category");

async function get(userId) {
  try {
    const categories = await Category.find({ owner: userId });
    if (!categories) {
      return { status: 400, message: "Category doesn't exist" };
    }
    return { status: 200, data: categories };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { get };
