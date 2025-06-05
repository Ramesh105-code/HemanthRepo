
import { students } from './students.js';

const withAvgGPA = students.map(student => {
  const total = student.gpas.reduce((sum, gpa) => sum + gpa, 0);
  const avgGPA = total / student.gpas.length;
  return { ...student, avgGPA: parseFloat(avgGPA.toFixed(2)) };
});

const honorRoll = withAvgGPA.filter(student => student.avgGPA >= 3.5);

const messages = honorRoll.map(student => {
  const scholarship = Math.max(0, (student.avgGPA - 3.5) * 10000);
  return `🎓 ${student.name} qualifies for the Honor Roll with a GPA of ${student.avgGPA.toFixed(2)} and earns $${scholarship.toFixed(2)} in scholarships.`;
});

console.log(`Total Students: ${students.length}`);
console.log(`Honor Roll Students: ${honorRoll.length}`);
console.log('');
console.log(messages);
