const Category = require("../../models/Category");

async function edit(categoryId, title) {
  try {
    if (title == null || title == "" || title == " ") {
      return { status: 400, code: "invalid_title" };
    }
    const candidate = await Category.findOne({ _id: categoryId });
    if (!candidate) {
      return { status: 404, code: "category_doesnt_exist" };
    }
    await Category.findOneAndUpdate({ _id: categoryId }, { $set: { title } });
    return { status: 200, code: "category_updated" };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { edit };
