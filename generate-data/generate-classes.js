const crypto = require("crypto");
const fs = require("fs");

const { TEACHERS_NUMBER, DB_NAME, WEEKDAYS, START_TIMES, CLASSES_TABLE } = require("./constants");
const { getRandomValuesFromArray, getRandomWord } = require("./utils");

const main = () => {
  const semestersIds = require("../data/ids/semesters-ids.json");
  const groupsIds = require("../data/ids/groups-ids.json");
  const subjectsIds = require("../data/ids/subjects-ids.json");
  const subjectTeachers = require("../data/ids/subject-teachers.json");

  const teacherStartTime = {};

  let fileContent = "";
  for (let i = 0; i < TEACHERS_NUMBER; i++) {
    const uuid = crypto.randomUUID();

    const [semesterId] = getRandomValuesFromArray(semestersIds, 1);
    const [groupId] = getRandomValuesFromArray(groupsIds, 1);
    const [weekday] = getRandomValuesFromArray(WEEKDAYS, 1);
    
    let teacherId, startTime, subjectId;
    let needToGetNewTeacherAndTime = true;
    while(needToGetNewTeacherAndTime) {
      [subjectId] = getRandomValuesFromArray(subjectsIds, 1);
      [teacherId] = getRandomValuesFromArray(subjectTeachers[subjectId], 1);
      [startTime] = getRandomValuesFromArray(START_TIMES, 1);
      needToGetNewTeacherAndTime = teacherStartTime[teacherId] && teacherStartTime[teacherId].includes(startTime)
    }
    if(teacherStartTime[teacherId]) teacherStartTime[teacherId].push(startTime);
    else teacherStartTime[teacherId] = [startTime]

    const audience = getRandomWord(4);
    const isEvenDay = Math.random() > 0.5 ? true : false;

    const insertCommand = `INSERT INTO ${DB_NAME}.${CLASSES_TABLE} (*) VALUES ('${uuid}', '${semesterId}', '${teacherId}', '${groupId}', '${subjectId}', '${weekday}', '${audience}', '${startTime}', '${isEvenDay}')`;
    const command = `clickhouse-client --database=${DB_NAME} --query="${insertCommand}"\n`;

    fileContent += command;
  }

  // console.log(teacherStartTime)

  fs.writeFileSync("./data/classes.txt", fileContent, "utf-8");
};
main();
module.exports = main;
