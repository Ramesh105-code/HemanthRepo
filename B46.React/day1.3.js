const freelancers = [
  { name: 'Alex', jobs: [120, 80, 150] },
  { name: 'Jamie', jobs: [300, 200, 50] },
  { name: 'Riya', jobs: [600, 100, 50] },
  { name: 'Sam', jobs: [400, 200, 100] }
];

const earnings = freelancers.map(freelancer => {
  const total = freelancer.jobs.reduce((sum, job) => sum + job, 0);
  return { name: freelancer.name, total };
});

const highEarners = earnings.filter(freelancer => freelancer.total > 500);

const summaries = highEarners.map(({ name, total }) => {
  const tax = total * 0.15;
  return `${name} earned $${total.toFixed(2)} and owes $${tax.toFixed(2)} in taxes.`;
});

console.log(summaries);
