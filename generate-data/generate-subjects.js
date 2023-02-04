const crypto = require("crypto");
const fs = require("fs");

const { SUBJECTS_NUMBER, DB_NAME, SUBJECTS_TABLE } = require("./constants");
const { getRandomInt, getRandomWord, getRandomValuesFromArray } = require("./utils");

const main = () => {
  const teachersIds = require("../data/ids/teachers-ids.json");
  const subjectTeachers = {};
  const uuids = [];
  let fileContent = "";
  for (let i = 0; i < SUBJECTS_NUMBER; i++) {
    const uuid = crypto.randomUUID();

    const titleLength = getRandomInt(3, 7);
    const title = getRandomWord(titleLength);

    const teachersNumber = getRandomInt(1, 6);
    const teachers = getRandomValuesFromArray(teachersIds, teachersNumber);

    const teachersString = teachers
      .reduce((prev, current) => `${prev}\\'${current}\\', `, "")
      .slice(0, -2);

    const insertCommand = `INSERT INTO ${DB_NAME}.${SUBJECTS_TABLE} (*) VALUES ('${uuid}', '${title}', '[${teachersString}]')`;
    const command = `clickhouse-client --database=${DB_NAME} --query="${insertCommand}"\n`;

    fileContent += command;
    uuids.push(uuid);
    subjectTeachers[uuid] = teachers;
  }

  fs.writeFileSync("./data/subjects.txt", fileContent, "utf-8");
  fs.writeFileSync("./data/ids/subjects-ids.json", JSON.stringify(uuids), "utf-8");
  fs.writeFileSync("./data/ids/subject-teachers.json", JSON.stringify(subjectTeachers), "utf-8");
};

module.exports = main;
