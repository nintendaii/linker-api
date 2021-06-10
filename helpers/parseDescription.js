var HTMLParser = require("node-html-parser");

async function parseDescription(dom) {
  const root = HTMLParser.parse(dom);
  let title = root
    .querySelectorAll('[name="description"]')[0]
    .getAttribute("content")
    .toString();
  return title.toString();
}

module.exports = { parseDescription };
