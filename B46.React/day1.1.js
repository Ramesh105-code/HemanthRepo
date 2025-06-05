const newUsers = ['alex', 'maria', 'daniel', 'sophie'];

const upperCaseNames = newUsers.map(name => name.toUpperCase());


const welcomeMessages = upperCaseNames.map(name => `WELCOME, ${name}! Thanks for joining CodeStarter.`);

console.log(welcomeMessages);
