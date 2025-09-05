const fs = require("fs");
const file = "notes.txt";

// Add a note
function addNote(note) {
  fs.appendFile(file, note + "\n", (err) => {
    if (err) {
      console.error("Error adding note:", err);
    } else {
      console.log("✅ Note added:", note);
    }
  });
}

// List all notes
function listNotes() {
  if (!fs.existsSync(file)) {
    console.log("No notes found.");
    return;
  }

  const data = fs.readFileSync(file, "utf-8").trim();
  if (!data) {
    console.log("No notes found.");
    return;
  }

  const notes = data.split("\n");
  console.log("📒 Notes:");
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
}

// Delete a note by line number
function deleteNote(lineNumber) {
  if (!fs.existsSync(file)) {
    console.log("No notes found.");
    return;
  }

  const data = fs.readFileSync(file, "utf-8").trim();
  if (!data) {
    console.log("No notes found.");
    return;
  }

  let notes = data.split("\n");

  if (lineNumber < 1 || lineNumber > notes.length) {
    console.log(" Error: Note does not exist.");
    return;
  }

  const removed = notes.splice(lineNumber - 1, 1);
  fs.writeFileSync(file, notes.join("\n") + (notes.length ? "\n" : ""));
  console.log(` Deleted note: "${removed}"`);
}


const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case "add":
    if (!argument) {
      console.log("❌ Please provide a note to add.");
    } else {
      addNote(argument);
    }
    break;
  case "list":
    listNotes();
    break;
  case "delete":
    if (!argument || isNaN(argument)) {
      console.log("❌ Please provide a valid note number to delete.");
    } else {
      deleteNote(parseInt(argument));
    }
    break;
  default:
    console.log("Usage:");
    console.log('  node app.js add "Your note here"');
    console.log("  node app.js list");
    console.log("  node app.js delete <note-number>");
}
