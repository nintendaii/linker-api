const Bookmark = require("../../models/Bookmark");

async function deleteBookmark(bookmarkId) {
  try {
    console.log(bookmarkId);
    const candidate = await Bookmark.findOne({ _id: bookmarkId });
    console.log(candidate);
    if (!candidate) {
      return { status: 404, code: "bookmark_doesnt_exist" };
    }
    await Bookmark.deleteOne({ _id: bookmarkId });
    return { status: 200, code: "bookmark_deleted" };
  } catch (error) {
    return { status: 400, code: "Something went wong ( " + error };
  }
}

module.exports = { deleteBookmark };
