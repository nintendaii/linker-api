const Bookmark = require("../../models/Bookmark");

async function deleteBookmark(bookmarkId) {
  try {
    console.log(bookmarkId);
    const candidate = await Bookmark.findOne({ _id: bookmarkId });
    console.log(candidate);
    if (!candidate) {
      return { status: 400, message: "Bookmark doesn't exist" };
    }
    await Bookmark.deleteOne({ _id: bookmarkId });
    return { status: 200, message: "Bookmark deleted" };
  } catch (error) {
    return { status: 400, message: "Something went wong ( " + error };
  }
}

module.exports = { deleteBookmark };
