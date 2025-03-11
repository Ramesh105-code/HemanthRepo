
const { format } = require('date-fns');

console.log("Welcome to Node.js!");

const now = new Date();
const formattedTime = format(now, "yyyy-MM-dd HH:mm:ss");

console.log("Current date and time:", formattedTime);
