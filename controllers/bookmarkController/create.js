const Bookmark = require("../../models/Bookmark");

async function create(body) {
  try {
    const { link, category } = body;
    const catCandidate = await Category.findOne({ title, owner: id });
    if (!candidate) {
      return { status: 400, message: "Category does not exist" };
    }
    let category = new Category({ title, owner: id });
    let data = await category.save();
    return { status: 200, message: "Category created", data };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

async function parseFavIco(link) {}

module.exports = { create };
