const request = require("request");
// const args = process.argv.slice(2);

const fetchBreedDescription = (breedName, callback) => {
  request(`https://api.thecatapi.com/v1/breeds`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    const data = JSON.parse(body);
    let id = "";
    for (let keys in data) {
      let categories = data[keys];
      // console.log(categories.id);
      if (categories.name === breedName) {
        id = categories.id;
      }
    }
    if (id === "") {
      callback("The breed was not found in the database.", null);
      return;
    }
    request(
      `https://api.thecatapi.com/v1/breeds/search?q=${id}`,
      (error, response, body) => {
        const specificData = JSON.parse(body)[0];
        callback(null, specificData.description);
      }
    );
  });
};

module.exports = { fetchBreedDescription };