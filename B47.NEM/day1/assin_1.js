const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function addTask(title, dueDate) {
  if (!title || !dueDate) {
    console.log('❌ Task title and due date are required.');
    return;
  }

  const tasks = loadTasks();
  const id = tasks.length + 1;

  const newTask = {
    id,
    title,
    dueDate,
    status: 'pending',
  };

  tasks.push(newTask);
  saveTasks(tasks);

  console.log(`✅ Task "${title}" added with due date ${dueDate}.`);
}

function listTasks() {
  const tasks = loadTasks();

  if (tasks.length === 0) {
    console.log('📭 No tasks available.');
    return;
  }

  console.log('\n📋 Task List:\n');
  tasks.forEach((task) => {
    console.log(
      `[${task.id}] ${task.title} - Due: ${task.dueDate} - Status: ${task.status}`
    );
  });
  console.log();
}
function completeTask(identifier) {
  const tasks = loadTasks();
  let found = false;

  tasks.forEach((task) => {
    if (
      task.id.toString() === identifier ||
      task.title.toLowerCase() === identifier.toLowerCase()
    ) {
      task.status = 'completed';
      found = true;
      console.log(`✅ Task "${task.title}" marked as completed.`);
    }
  });

  if (!found) {
    console.log('❌ Task not found.');
  } else {
    saveTasks(tasks);
  }
}


function handleCommand() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('📌 Welcome to Task Manager!\n');

  switch (command) {
    case 'add-task':
      addTask(args[1], args[2]);
      break;

    case 'list-tasks':
      listTasks();
      break;

    case 'complete-task':
      completeTask(args[1]);
      break;

    default:
      console.log(`Usage:
  node taskManager.js add-task "Title" "YYYY-MM-DD"
  node taskManager.js list-tasks
  node taskManager.js complete-task "Title or ID"`);
  }
}

handleCommand();
