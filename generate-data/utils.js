const fs = require("fs");

// max is exclusive
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
exports.getRandomInt = getRandomInt;

exports.getRandomWord = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

exports.getRandomValuesFromArray = (array, valuesNumber) => {
  const values = [];

  for (let i = 0; i < valuesNumber; i++) {
    const index = getRandomInt(0, array.length);
    const value = array[index];
    values.push(value);
  }

  return [...new Set(values)];
};

exports.checkDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};
