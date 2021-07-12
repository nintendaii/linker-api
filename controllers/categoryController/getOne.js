const Bookmark = require("../../models/Bookmark");
const Category = require("../../models/Category");

async function getOne(id) {
  try {
    let category = await Category.findOne({ _id: id });
    if (!category) {
      return { status: 404, code: "category_doesnt_exist" };
    }
    let linksObjs = await Bookmark.find({ _id: category.links });
    category.links = linksObjs;
    return { status: 200, data: category };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { getOne };
