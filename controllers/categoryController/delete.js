const Category = require("../../models/Category");

async function deleteCategory(categoryId) {
  try {
    const candidate = await Category.findOne({ _id: categoryId });
    if (!candidate) {
      return { status: 400, code: "category_doesnt_exist" };
    }
    await Category.deleteOne({ _id: categoryId });
    return { status: 200, code: "category_deleted" };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { deleteCategory };
