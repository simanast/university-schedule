const crypto = require("crypto");
const fs = require("fs");

const { STUDENTS_NUMBER, DB_NAME, STUDENTS_TABLE } = require("./constants");
const { getRandomInt, getRandomWord, getRandomValuesFromArray } = require("./utils");

const main = () => {
  const groupsIds = require("../data/ids/groups-ids.json");

  const uuids = [];
  let fileContent = "";
  for (let i = 0; i < STUDENTS_NUMBER; i++) {
    const uuid = crypto.randomUUID();

    const firstNameLength = getRandomInt(3, 7);
    const firstName = getRandomWord(firstNameLength);

    const lastNameLength = getRandomInt(3, 7);
    const lastName = getRandomWord(lastNameLength);

    const fullName = `${firstName}_${lastName}`;

    const groupId = getRandomValuesFromArray(groupsIds, 1);

    const insertCommand = `INSERT INTO ${DB_NAME}.${STUDENTS_TABLE} (*) VALUES ('${uuid}', '${fullName}', '${groupId}')`;
    const command = `clickhouse-client --database=${DB_NAME} --query="${insertCommand}"\n`;

    fileContent += command;
    uuids.push(uuid);
  }

  fs.writeFileSync("./data/students.txt", fileContent, "utf-8");
  fs.writeFileSync("./data/ids/students-ids.json", JSON.stringify(uuids), "utf-8");
};

module.exports = main;
