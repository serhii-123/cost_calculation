import getExecutionData from "./getExecutionData";

let ed = getExecutionData('ukr', new Date("2025-04-10"), 'docx', 1488);

console.log(ed);
console.log(ed.deadline.toLocaleString());