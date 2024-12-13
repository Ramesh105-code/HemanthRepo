
const chalk = require('chalk'); 
const moment = require('moment'); 

console.log(chalk.bold.blue('Welcome to Node.js!'));


const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');


console.log(chalk.green(`The current date and time is: ${currentDateTime}`));
