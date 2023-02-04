const crypto = require("crypto");
const fs = require("fs");

const { GROUPS_NUMBER, DB_NAME, GROUPS_TABLE } = require("./constants");
const { getRandomInt, getRandomWord } = require("./utils");

const main = () => {
  const uuids = [];
  let fileContent = "";
  for (let i = 0; i < GROUPS_NUMBER; i++) {
    const uuid = crypto.randomUUID();

    const titleLength = getRandomInt(3, 7);
    const title = getRandomWord(titleLength);

    const insertCommand = `INSERT INTO ${DB_NAME}.${GROUPS_TABLE} (*) VALUES ('${uuid}', '${title}')`;
    const command = `clickhouse-client --database=${DB_NAME} --query="${insertCommand}"\n`;

    fileContent += command;
    uuids.push(uuid);
  }

  fs.writeFileSync("./data/groups.txt", fileContent, "utf-8");
  fs.writeFileSync("./data/ids/groups-ids.json", JSON.stringify(uuids), "utf-8");
};

module.exports = main;
