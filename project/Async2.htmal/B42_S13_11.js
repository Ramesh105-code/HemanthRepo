// Import the 'date-fns' library for formatting the date and time
const { format } = require('date-fns');

// Function to get and format the current date and time
function getCurrentDateTime() {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}

// Display the welcome message
console.log("Welcome to Node.js!");

// Display the current date and time
console.log(`Current Date and Time: ${getCurrentDateTime()}`);
