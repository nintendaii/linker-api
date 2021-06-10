const Bookmark = require("../../models/Bookmark");
const Category = require("../../models/Category");
const { getDOM } = require("../../helpers/getDOM");
const { parseFavIco } = require("../../helpers/parseFavicon");
const { parseTitle } = require("../../helpers/parseTitle");
const { parseDescription } = require("../../helpers/parseDescription");

async function create(body) {
  try {
    const { link, category } = body;
    const catCandidate = await Category.findById(category);
    if (!catCandidate) {
      return { status: 400, message: "Category does not exist" };
    }
    const dom = await getDOM(link);
    var favicon = await parseFavIco(dom, link);
    var title = await parseTitle(dom);
    var description = await parseDescription(dom);
    const bookmark = new Bookmark({
      title,
      description,
      favicon,
      link,
      category,
    });
    let result = await bookmark.save();
    return { status: 200, message: "Bookmark created", data: result };
  } catch (error) {
    return { status: 400, message: "Something went wrong " + error };
  }
}

module.exports = { create };
