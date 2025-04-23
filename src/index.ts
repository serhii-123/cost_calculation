import getExecutionData from "./getExecutionData";

let ed = getExecutionData('ukr', new Date("2025-04-10"), 'docx', 1333);

console.log(ed.deadline.toLocaleString());