const Category = require("../../models/Category");

async function edit(categoryId, title) {
  try {
    if (title == null || title == "" || title == " ") {
      return { status: 400, message: "Invalid title" };
    }
    const candidate = await Category.findOne({ _id: categoryId });
    if (!candidate) {
      return { status: 400, message: "Category doesn't exist" };
    }
    await Category.findOneAndUpdate({ _id: categoryId }, { $set: { title } });
    return { status: 200, message: "Category updated" };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { edit };
