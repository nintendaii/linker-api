const Category = require("../../models/Category");

async function get(userId) {
  try {
    const categories = await Category.find({ owner: userId });
    if (!categories) {
      return { status: 404, code: "category_doesnt_exist" };
    }
    return { status: 200, data: categories };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { get };
