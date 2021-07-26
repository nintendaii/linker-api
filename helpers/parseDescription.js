var HTMLParser = require("node-html-parser");

async function parseDescription(dom) {
  const root = HTMLParser.parse(dom);
  try {
    let description = root
      .querySelectorAll('[name="description"]')[0]
      .getAttribute("content")
      .toString();
    if (!description) {
      description = "No description.";
    }
    return description.toString();
  } catch (error) {
    console.error("From catch: " + error);
    return "No description.";
  }
}

module.exports = { parseDescription };
