const users = [
  { name: 'Emily', workouts: [1, 0, 2, 1, 0, 3, 1] },
  { name: 'Jake', workouts: [0, 0, 0, 0, 0, 0, 0] },
  { name: 'Laura', workouts: [2, 2, 2, 2, 2, 2, 2] },
  { name: 'Tom', workouts: [0, 1, 1, 0, 1, 1, 1] }
];


const usersWithTotal = users.map(user => ({
  name: user.name,
  total: user.workouts.reduce((sum, w) => sum + w, 0)
}));

const activeUsers = usersWithTotal.filter(user => user.total >= 3);


const activeUserNames = activeUsers.map(user => user.name);
const individualTotals = activeUsers.map(user => user.total);


const totalWorkouts = individualTotals.reduce((sum, val) => sum + val, 0);


console.log("Active Users:", activeUserNames);
console.log("Individual Totals:", individualTotals);
console.log("Total Workouts This Week (Active Users):", totalWorkouts);
