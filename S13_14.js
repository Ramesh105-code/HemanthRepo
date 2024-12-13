// Import the required modules
const chalk = require('chalk'); // Install this package with `npm install chalk`

// Get command-line arguments
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log(chalk.red('Error: Please provide exactly three arguments: <number1> <operator> <number2>'));
  process.exit(1);
}

const [num1, operator, num2] = args;
const number1 = parseFloat(num1);
const number2 = parseFloat(num2);

if (isNaN(number1) || isNaN(number2)) {
  console.log(chalk.red('Error: Both arguments must be valid numbers.'));
  process.exit(1);
}

let result;
switch (operator) {
  case '+':
    result = number1 + number2;
    break;
  case '-':
    result = number1 - number2;
    break;
  case '*':
    result = number1 * number2;
    break;
  case '/':
    if (number2 === 0) {
      console.log(chalk.red('Error: Division by zero is not allowed.'));
      process.exit(1);
    }
    result = number1 / number2;
    break;
  default:
    console.log(chalk.red(`Error: Invalid operator '${operator}'. Supported operators are +, -, *, /.`));
    process.exit(1);
}

console.log(chalk.green(`The result of ${number1} ${operator} ${number2} is ${result}.`));

// Countdown timer functionality
let time = 5;
const countdown = setInterval(() => {
  if (time >= 0) {
    console.log(`Time left: ${time} seconds`);
    time--;
  } else {
    console.log('Countdown finished!');
    clearInterval(countdown);
  }
}, 1000);
