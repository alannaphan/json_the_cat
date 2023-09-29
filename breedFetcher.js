const request = require("request");
const args = process.argv.slice(2);

const breedFetcher = (breed) => {
  request(`https://api.thecatapi.com/v1/breeds`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    const data = JSON.parse(body);
    let id = "";
    for (let keys in data) {
      let categories = data[keys];
      // console.log(categories.id);
      if (categories.name === breed) {
        id = categories.id;
      }
    }
    if (id === "") {
      console.log("The breed was not found in the database.");
      return;
    }
    request(
      `https://api.thecatapi.com/v1/breeds/search?q=${id}`,
      (error, response, body) => {
        const specificData = JSON.parse(body)[0];
        console.log(specificData.description);
      }
    );
  });
};

breedFetcher(args[0]);
