const fs = require('fs');
const path = require('path');
const TASKS_FILE = path.join(__dirname, 'tasks.json');
const PREFS_FILE = path.join(__dirname, 'preferences.json');

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TASKS_FILE));
}
function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}
function loadPreferences() {
  if (!fs.existsSync(PREFS_FILE)) return { filter: 'all' };
  return JSON.parse(fs.readFileSync(PREFS_FILE));
}
function savePreferences(prefs) {
  fs.writeFileSync(PREFS_FILE, JSON.stringify(prefs, null, 2));
}

function isValidDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}
function validateInput(title, dueDate) {
  if (!title.trim()) return "Title cannot be empty.";
  if (!isValidDate(dueDate)) return "Due date must be in YYYY-MM-DD format.";
  return null;
}

function addTask(title, dueDate) {
  const error = validateInput(title, dueDate);
  if (error) return console.log(`❌ ${error}`);

  const tasks = loadTasks();
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

  tasks.push({ id, title, dueDate, status: 'pending' });
  saveTasks(tasks);
  console.log(`✅ Task "${title}" added.`);
}

function listTasks() {
  const tasks = loadTasks();
  const prefs = loadPreferences();

  let filtered = tasks;
  if (prefs.filter === 'completed') filtered = tasks.filter(t => t.status === 'completed');
  if (prefs.filter === 'pending') filtered = tasks.filter(t => t.status === 'pending');

  if (!filtered.length) return console.log('📭 No tasks to show.');

  console.log('\n📋 Tasks:\n');
  filtered.forEach(t =>
    console.log(`[${t.id}] ${t.title} - Due: ${t.dueDate} - Status: ${t.status}`)
  );
}

function completeTask(idOrTitle) {
  const tasks = loadTasks();
  const task = tasks.find(t =>
    t.id.toString() === idOrTitle || t.title.toLowerCase() === idOrTitle.toLowerCase()
  );
  if (!task) return console.log('❌ Task not found.');

  task.status = 'completed';
  saveTasks(tasks);
  console.log(`✅ Task "${task.title}" marked as completed.`);
}

function updateTask(idOrTitle, newTitle, newDueDate) {
  const tasks = loadTasks();
  const task = tasks.find(t =>
    t.id.toString() === idOrTitle || t.title.toLowerCase() === idOrTitle.toLowerCase()
  );
  if (!task) return console.log('❌ Task not found.');

  if (newTitle && newTitle.trim()) task.title = newTitle;
  if (newDueDate && isValidDate(newDueDate)) task.dueDate = newDueDate;
  else if (newDueDate && !isValidDate(newDueDate)) return console.log('❌ Invalid due date format.');

  saveTasks(tasks);
  console.log(`✏️ Task "${idOrTitle}" updated.`);
}

function deleteTask(idOrTitle) {
  let tasks = loadTasks();
  const initialLen = tasks.length;
  tasks = tasks.filter(t =>
    t.id.toString() !== idOrTitle && t.title.toLowerCase() !== idOrTitle.toLowerCase()
  );
  if (tasks.length === initialLen) return console.log('❌ Task not found.');

  saveTasks(tasks);
  console.log(`🗑️ Task "${idOrTitle}" deleted.`);
}

function searchTasks(query) {
  const tasks = loadTasks();
  const results = tasks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.dueDate.includes(query)
  );
  if (!results.length) return console.log('🔍 No matching tasks.');

  console.log('\n🔍 Search Results:\n');
  results.forEach(t =>
    console.log(`[${t.id}] ${t.title} - Due: ${t.dueDate} - Status: ${t.status}`)
  );
}

function setPreference(option) {
  const valid = ['all', 'completed', 'pending'];
  if (!valid.includes(option)) {
    return console.log(`❌ Invalid preference. Use one of: ${valid.join(', ')}`);
  }
  savePreferences({ filter: option });
  console.log(`⚙️ Preference set to show "${option}" tasks.`);
}

function showHelp() {
  console.log(`
📘 Task Manager Commands:
-------------------------------------------------
add-task "title" "YYYY-MM-DD"         → Add new task
list-tasks                            → List tasks (respects filter)
complete-task "ID or Title"           → Mark task as completed
update-task "ID/Title" "newTitle" "newDueDate" → Update a task
delete-task "ID or Title"             → Delete a task
search-tasks "keyword"                → Search by title or date
set-preference "all/completed/pending" → Set display filter
help                                  → Show command list
`);
}

function handleCommand() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  console.log("📌 Welcome to Task Manager CLI\n");

  try {
    switch (cmd) {
      case 'add-task': addTask(args[1], args[2]); break;
      case 'list-tasks': listTasks(); break;
      case 'complete-task': completeTask(args[1]); break;
      case 'update-task': updateTask(args[1], args[2], args[3]); break;
      case 'delete-task': deleteTask(args[1]); break;
      case 'search-tasks': searchTasks(args[1]); break;
      case 'set-preference': setPreference(args[1]); break;
      case 'help': showHelp(); break;
      default:
        console.log('❗ Invalid command. Use `help` to see options.');
    }
  } catch (err) {
    console.log(`❌ Unexpected error: ${err.message}`);
  }
}

handleCommand();
