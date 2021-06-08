const Category = require("../../models/Category");

async function getOne(id) {
  try {
    const category = await Category.findOne({ _id: id });
    console.log(category);
    if (!category) {
      return { status: 400, message: "Category doesn't exist" };
    }
    return { status: 200, data: category };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { getOne };
