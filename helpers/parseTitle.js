var HTMLParser = require("node-html-parser");

async function parseTitle(dom) {
  try {
    const root = HTMLParser.parse(dom);
    let title = root.querySelectorAll("title")[0].innerText;
    return title.toString();
  } catch (error) {
    console.error(error);
    return "No title";
  }
}

module.exports = { parseTitle };
