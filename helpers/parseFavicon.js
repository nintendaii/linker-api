var HTMLParser = require("node-html-parser");

async function parseFavIco(dom, link) {
  const root = HTMLParser.parse(dom);
  let allIcons = root.querySelectorAll('[rel="icon"], [rel="shortcut icon"]');
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

module.exports = { parseFavIco };
