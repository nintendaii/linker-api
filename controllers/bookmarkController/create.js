const Bookmark = require("../../models/Bookmark");
const Category = require("../../models/Category");
var HTMLParser = require("node-html-parser");
var needle = require("needle");
var dom;

async function create(body) {
  try {
    const { link, category } = body;
    const catCandidate = await Category.findById(category);
    if (!catCandidate) {
      return { status: 400, message: "Category does not exist" };
    }
    await getDOM(link);
    var favicon = await parseFavIco(link);
    var title = await parseTitle();
    var description = await parseDescription();
    const bookmark = new Bookmark({
      title,
      description,
      favicon,
      link,
      category,
    });
    let result = await bookmark.save();
    // let category = new Category({ title, owner: id });
    // let data = await category.save();
    return { status: 200, message: "Bookmark created", data: result };
  } catch (error) {
    return { status: 400, message: "Something went wrong " + error };
  }
}

async function getDOM(link) {
  dom = new Promise((resolve, reject) => {
    needle.get(link, function (error, response) {
      if (!error) {
        resolve(response.body);
      } else {
        reject(error);
      }
    });
  });
}

async function parseFavIco(link) {
  var temp = null;
  temp = await dom.then();
  const root = HTMLParser.parse(temp);
  let allIcons = root.querySelectorAll('[rel="icon"], [rel="shortcut icon"]');
  console.log(allIcons.toString());
  let a = [];
  allIcons.forEach((icon) => {
    let favRef = icon.getAttribute("href").toString();
    if (!favRef.includes("http")) {
      let splits = link.split("/", 3);
      a.push(splits[0] + "//" + splits[2] + favRef);
      return;
    }
    a.push(favRef);
  });
  return a;
}

async function parseTitle() {
  var temp = null;
  temp = await dom.then();
  const root = HTMLParser.parse(temp);
  let title = root.querySelectorAll("title")[0].innerText;
  return title.toString();
}

async function parseDescription() {
  var temp = null;
  temp = await dom.then();
  const root = HTMLParser.parse(temp);
  let title = root
    .querySelectorAll('[name="description"]')[0]
    .getAttribute("content")
    .toString();
  return title.toString();
}

module.exports = { create };
