var HTMLParser = require("node-html-parser");

async function parseTitle(dom) {
  const root = HTMLParser.parse(dom);
  let title = root.querySelectorAll("title")[0].innerText;
  return title.toString();
}

module.exports = { parseTitle };
