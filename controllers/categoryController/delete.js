const Category = require("../../models/Category");

async function deleteCategory(categoryId) {
  try {
    const candidate = await Category.findOne({ _id: categoryId });
    if (!candidate) {
      return { status: 400, message: "Category doesn't exist" };
    }
    await Category.deleteOne({ _id: categoryId });
    return { status: 200, message: "Category deleted" };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { deleteCategory };
