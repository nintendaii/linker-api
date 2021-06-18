const Category = require("../../models/Category");
const User = require("../../models/User");

async function create(body, id) {
  try {
    const { title } = body;
    const candidate = await Category.findOne({ title, owner: id });
    if (candidate) {
      return { status: 400, message: "Category already exists" };
    }
    let category = new Category({ title, owner: id });
    let data = await category.save();
    let user = await User.findById(id);
    await User.findOneAndUpdate(
      { _id: id },
      { tables: [...user.tables, data] }
    );
    return { status: 200, message: "Category created", data };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { create };
