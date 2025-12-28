const employees = [
  { id: 1, name: "John", dept: "Engineering", salary: 80000 },
  { id: 2, name: "Jane", dept: "Engineering", salary: 95000 },
  {
    id: 3,
    name: {
      id: 4,
      name: {
        id: 5,
        name: {
          id: 6,
          name: "Bob",
          dept: "Marketing",
          salary: 65000,
        },
        name: "Alice",
        dept: "Engineering",
        salary: 88000,
      },
      name: "Charlie's",
      dept: "Marketing",
      salary: 72000,
    },
    dept: null,
    salary: null,
  },
  { id: 7, name: "Diana", dept: "HR", salary: 70000 },
];


function extractEmployees(item) {
  const result = [];

  function helper(obj) {
    if (obj && typeof obj === "object") {
    
      if (obj.dept && obj.salary && obj.name && typeof obj.name === "string") {
        result.push(obj);
      }

      for (const key in obj) {
        helper(obj[key]);
      }
    }
  }

  helper(item);
  return result;
}

const flat = employees.flatMap(extractEmployees);

const deptSummary = flat.reduce((acc, { name, dept, salary }) => {
  if (!acc[dept]) {
    acc[dept] = { employees: [], totalSalary: 0, totalCount: 0 };
  }
  acc[dept].employees.push(name);
  acc[dept].totalSalary += salary;
  acc[dept].totalCount += 1;
  return acc;
}, {});

for (const dept in deptSummary) {
  const d = deptSummary[dept];
  d.avgSalary = parseFloat((d.totalSalary / d.totalCount).toFixed(2));
  delete d.totalSalary;
}

console.log(deptSummary);