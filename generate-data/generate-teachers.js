const crypto = require("crypto");
const fs = require("fs");

const { TEACHERS_NUMBER, DB_NAME, TEACHERS_TABLE } = require("./constants");
const { getRandomInt, getRandomWord } = require("./utils");

const main = () => {
  const uuids = [];
  let fileContent = "";
  for (let i = 0; i < TEACHERS_NUMBER; i++) {
    const uuid = crypto.randomUUID();

    const firstNameLength = getRandomInt(3, 7);
    const firstName = getRandomWord(firstNameLength);

    const lastNameLength = getRandomInt(3, 7);
    const lastName = getRandomWord(lastNameLength);

    const fullName = `${firstName}_${lastName}`;

    const insertCommand = `INSERT INTO ${DB_NAME}.${TEACHERS_TABLE} (*) VALUES ('${uuid}', '${fullName}')`;
    const command = `clickhouse-client --database=${DB_NAME} --query="${insertCommand}"\n`;

    fileContent += command;
    uuids.push(uuid);
  }

  fs.writeFileSync("./data/teachers.txt", fileContent, "utf-8");
  fs.writeFileSync("./data/ids/teachers-ids.json", JSON.stringify(uuids), "utf-8");
};

module.exports = main;
