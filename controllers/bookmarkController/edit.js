const Bookmark = require("../../models/Bookmark");
const Category = require("../../models/Category");

async function edit(bookmarkId, categoryId) {
  try {
    const candidateBookmark = await Bookmark.findById(bookmarkId);
    if (!candidateBookmark) {
      return { status: 404, code: "bookmark_doesnt_exist" };
    }
    const candidateCategory = await Category.findById(categoryId);
    if (!candidateCategory) {
      return { status: 404, code: "category_doesnt_exist" };
    }
    if (candidateBookmark.category == candidateCategory.id) {
      return { status: 400, code: "category_match" };
    }
    let oldCat = await Category.findById(candidateBookmark.category);
    console.log(oldCat.links);
    let filteredLinks = oldCat.links.filter((el) => el != bookmarkId);
    console.log(filteredLinks);
    await Category.findOneAndUpdate(
      { _id: candidateBookmark.category },
      { $set: { links: filteredLinks } }
    );
    await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: { links: [candidateBookmark.id, ...candidateCategory.links] } }
    );
    await Bookmark.findOneAndUpdate(
      { _id: bookmarkId },
      { $set: { category: candidateCategory } }
    );
    return { status: 200, code: "bookmark_updated" };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { edit };
