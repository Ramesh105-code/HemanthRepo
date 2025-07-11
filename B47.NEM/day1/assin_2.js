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
  if (!tasks.length) return console.log('📭 No tasks available.');

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

function updateTask(identifier, newTitle, newDate) {
  const tasks = loadTasks();
  let found = false;

  tasks.forEach((task) => {
    if (
      task.id.toString() === identifier ||
      task.title.toLowerCase() === identifier.toLowerCase()
    ) {
      if (newTitle) task.title = newTitle;
      if (newDate) task.dueDate = newDate;
      found = true;
      console.log(`✏️ Task "${identifier}" updated.`);
    }
  });

  if (!found) {
    console.log('❌ Task not found.');
  } else {
    saveTasks(tasks);
  }
}


function deleteTask(identifier) {
  let tasks = loadTasks();
  const originalLength = tasks.length;

  tasks = tasks.filter(
    (task) =>
      task.id.toString() !== identifier &&
      task.title.toLowerCase() !== identifier.toLowerCase()
  );

  if (tasks.length === originalLength) {
    console.log('❌ Task not found.');
  } else {
    saveTasks(tasks);
    console.log(`🗑️ Task "${identifier}" deleted.`);
  }
}

function searchTasks(query) {
  const tasks = loadTasks();
  const matches = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.dueDate.includes(query)
  );

  if (!matches.length) {
    console.log('🔍 No matching tasks found.');
    return;
  }

  console.log('\n🔍 Search Results:\n');
  matches.forEach((task) => {
    console.log(
      `[${task.id}] ${task.title} - Due: ${task.dueDate} - Status: ${task.status}`
    );
  });
  console.log();
}

function showHelp() {
  console.log(`
📘 Available Commands:
-------------------------------------
add-task "title" "YYYY-MM-DD"         → Add a new task
list-tasks                            → Show all tasks
complete-task "ID or Title"           → Mark a task as completed
update-task "ID or Title" "New Title" "New Due Date" → Update task details
delete-task "ID or Title"             → Delete a task
search-tasks "keyword or date"        → Search tasks by title or date
help                                  → Show available commands
`);
}

function handleCommand() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('📌 Welcome to Terminal Task Manager!\n');

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

    case 'update-task':
      updateTask(args[1], args[2], args[3]);
      break;

    case 'delete-task':
      deleteTask(args[1]);
      break;

    case 'search-tasks':
      searchTasks(args[1]);
      break;

    case 'help':
      showHelp();
      break;

    default:
      console.log('❗ Invalid command. Use `help` to see available commands.');
  }
}

handleCommand();
