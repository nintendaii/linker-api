var HTMLParser = require("node-html-parser");

async function parseDescription(dom) {
  const root = HTMLParser.parse(dom);
  let description = root
    .querySelectorAll('[name="description"]')[0]
    .getAttribute("content")
    .toString();
  if (!description) {
    description = "No description.";
  }
  return description.toString();
}

module.exports = { parseDescription };
