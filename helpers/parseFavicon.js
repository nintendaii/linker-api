var HTMLParser = require("node-html-parser");

async function parseFavIco(dom, link) {
  try {
    const root = HTMLParser.parse(dom);
    let allIcons = root.querySelectorAll('[rel="icon"], [rel="shortcut icon"]');
    let a = [];
    if (!allIcons) {
      return a;
    }
    allIcons.forEach((icon) => {
      let favRef = icon.getAttribute("href").toString();
      if (!favRef.includes("http")) {
        let googleS2Link =
          "https://s2.googleusercontent.com/s2/favicons?domain_url=" + link;
        a.push(googleS2Link);
        return;
      }
      a.push(favRef);
    });
    return a;
  } catch (error) {
    console.error("From catch: " + error);
    return "https://s2.googleusercontent.com/s2/favicons?domain_url=" + link;
  }
}

module.exports = { parseFavIco };
