const Category = require("../../models/Category");

async function getOne(id) {
  try {
    const category = await Category.findOne({ _id: id });
    console.log(category);
    if (!category) {
      return { status: 404, code: "category_doesnt_exist" };
    }
    return { status: 200, data: category };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { getOne };
