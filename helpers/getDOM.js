var needle = require("needle");

async function getDOM(link) {
  let dom = await new Promise((resolve, reject) => {
    needle.get(link, function (error, response) {
      if (!error) {
        resolve(response.body);
      } else {
        reject(error);
      }
    });
  });
  return dom;
}

module.exports = { getDOM };
