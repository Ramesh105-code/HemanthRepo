// script.js
let reminders = [];

function addReminder() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const reminderTime = new Date(document.getElementById("reminder-time").value);
    const currentTime = new Date();

    if (reminderTime <= currentTime) {
        alert("Please select a future time for the reminder.");
        return;
    }

    const reminderId = Date.now();
    const timeDiff = reminderTime - currentTime;

    const timeoutId = setTimeout(() => {
        alert(Reminder: ${title} - ${description});
        deleteReminder(reminderId);
    }, timeDiff);

    const reminder = { id: reminderId, title, description, reminderTime, timeoutId };
    reminders.push(reminder);
    displayReminders();
}

function deleteReminder(id) {
    const index = reminders.findIndex(reminder => reminder.id === id);
    if (index !== -1) {
        clearTimeout(reminders[index].timeoutId);
        reminders.splice(index, 1);
    }
    displayReminders();
}

function editReminder(id) {
    const reminder = reminders.find(reminder => reminder.id === id);
    if (reminder) {
        document.getElementById("title").value = reminder.title;
        document.getElementById("description").value = reminder.description;
        document.getElementById("reminder-time").value = reminder.reminderTime.toISOString().slice(0, 16);
        deleteReminder(id);
    }
}

function displayReminders() {
    const activeReminders = document.getElementById("active-reminders");
    activeReminders.innerHTML = "";

    reminders.forEach(reminder => {
        const reminderElement = document.createElement("li");
        reminderElement.textContent = ${reminder.title} - ${new Date(reminder.reminderTime).toLocaleString()};

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editReminder(reminder.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteReminder(reminder.id);

        reminderElement.appendChild(editButton);
        reminderElement.appendChild(deleteButton);
        activeReminders.appendChild(reminderElement);
    });
}

document.getElementById("add-reminder").addEventListener("click", addReminder);
setInterval(displayReminders, 60000);  // Update active reminders every minute