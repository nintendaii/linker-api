const Bookmark = require("../../models/Bookmark");
const Category = require("../../models/Category");
const { getDOM } = require("../../helpers/getDOM");
const { parseFavIco } = require("../../helpers/parseFavicon");
const { parseTitle } = require("../../helpers/parseTitle");
const { parseDescription } = require("../../helpers/parseDescription");

async function create(body, userId) {
  try {
    const { link, category } = body;
    var catCandidate = null;
    if (category) {
      catCandidate = await Category.findById(category);
      if (!catCandidate) {
        return { status: 400, code: "category_doesnt_exist" };
      }
    }

    const dom = await getDOM(link);
    var favicon = await parseFavIco(dom, link);
    var title = await parseTitle(dom);
    var description = await parseDescription(dom);
    var owner = userId;
    var date = new Date();
    const bookmark = new Bookmark({
      title,
      description,
      favicon,
      link,
      category,
      date,
      owner,
    });
    let result = await bookmark.save();
    if (category) {
      const catLinks = catCandidate.links;
      await Category.findOneAndUpdate(
        { _id: category },
        { links: [...catLinks, result.id] }
      );
    }

    return { status: 200, code: "bookmark_created", data: result };
  } catch (error) {
    return { status: 400, code: "Something went wrong " + error };
  }
}

module.exports = { create };
