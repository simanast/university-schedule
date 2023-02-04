const generateTeachers = require("./generate-teachers");
const generateSubjects = require("./generate-subjects");
const generateSemesters = require("./generate-semesters");
const generateGroups = require("./generate-groups");
const generateStudents = require("./generate-students");
const generateClasses = require("./generate-classes");
const { checkDir } = require("./utils");

checkDir("./data");
checkDir("./data/ids");

generateTeachers();
generateSubjects();
generateSemesters();
generateGroups();
generateStudents();
generateClasses();
