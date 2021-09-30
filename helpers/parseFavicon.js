var HTMLParser = require("node-html-parser");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let psl = require("psl");

async function parseFavIco(dom, link) {
  try {
    const root = HTMLParser.parse(dom);
    let allIcons = root.querySelectorAll('[rel="icon"], [rel="shortcut icon"]');
    let a = [];
    if (!allIcons || allIcons.length == 0) {
      return [
        "https://s2.googleusercontent.com/s2/favicons?domain_url=" + link,
      ];
    }
    allIcons.forEach((icon) => {
      let favRef = icon.getAttribute("href").toString();
      if (!favRef.includes("http")) {
        let base = extractHostname(link);
        a.push(base + favRef);
        return;
      }
      a.push(favRef);
    });
    a.forEach((icon) => console.log(getFileSize(icon)));
    return a;
  } catch (error) {
    console.error("From catch: " + error);
    return ["https://s2.googleusercontent.com/s2/favicons?domain_url=" + link];
  }
}

function getFileSize(url) {
  try {
    console.log("start");
    var fileSize = "";
    var http = new XMLHttpRequest();
    http.open("HEAD", url, false); // false = Synchronous

    http.send(null); // it will stop here until this http request is complete

    // when we are here, we already have a response, b/c we used Synchronous XHR

    if (http.status === 200) {
      fileSize = http.getResponseHeader("content-length");
      console.log("fileSize = " + fileSize);
    }

    return fileSize;
  } catch (error) {
    console.log(error);
  }
}

function extractHostname(url) {
  var hostname = url.split("/");
  hostname = hostname[0] + "//" + hostname[2];
  return hostname;
}

module.exports = { parseFavIco };
