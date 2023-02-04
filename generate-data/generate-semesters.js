const crypto = require("crypto");
const fs = require("fs");

const {
  DB_NAME,
  INITIAL_SEMESTER_START_DATE,
  SEMESTERS_NUMBER,
  SEMESTERS_TABLE,
} = require("./constants");

const formatDate = (date) => {
  const month = String(date.getMonth() + 1); //months from 1-12
  const day = String(date.getDate());
  const year = String(date.getFullYear());

  const formatDay = day.length === 1 ? "0" + day : day;
  const formatMonth = month.length === 1 ? "0" + month : month;
  return year + "-" + formatMonth + "-" + formatDay;
};

const addWeeks = (startDate, weeksNumber) => {
  const DAYS_IN_WEEK = 7;
  const date = new Date(startDate.getTime());
  date.setDate(date.getDate() + weeksNumber * DAYS_IN_WEEK);
  return date;
};

const main = () => {
  const uuids = [];
  let fileContent = "";
  let startDate = new Date(INITIAL_SEMESTER_START_DATE);
  for (let i = 0; i < SEMESTERS_NUMBER; i++) {
    const uuid = crypto.randomUUID();

    const studyWeeksNumber = 18;
    const endDate = addWeeks(startDate, studyWeeksNumber);

    // const insertCommand = `INSERT INTO ${DB_NAME}.${SEMESTERS_TABLE} (*) VALUES ('${uuid}', ${+startDate}, ${+endDate})`;
    const insertCommand = `INSERT INTO ${DB_NAME}.${SEMESTERS_TABLE} (*) VALUES ('${uuid}', '${formatDate(
      startDate
    )}', '${formatDate(endDate)}')`;

    const command = `clickhouse-client --database=${DB_NAME} --query="${insertCommand}"\n`;

    fileContent += command;
    uuids.push(uuid);

    const vacationWeeksNumber = 2;
    startDate = addWeeks(endDate, vacationWeeksNumber);
  }

  fs.writeFileSync("./data/semesters.txt", fileContent, "utf-8");
  fs.writeFileSync("./data/ids/semesters-ids.json", JSON.stringify(uuids), "utf-8");
};

module.exports = main;
