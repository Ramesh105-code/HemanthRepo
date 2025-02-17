import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let users = [];
let currentPage = 1;
const usersPerPage = 5;

async function fetchUsers() {
  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      users = Object.values(snapshot.val()); // Convert object to array
      displayPage(currentPage);
    } else {
      console.log("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function displayPage(page) {
  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;
  const paginatedUsers = users.slice(start, end);

  console.log(Page ${page}:, paginatedUsers);
}

function nextPage() {
  if (currentPage * usersPerPage < users.length) {
    currentPage++;
    displayPage(currentPage);
  } else {
    console.log("No more pages.");
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  } else {
    console.log("You are on the first page.");
  }
}

// Fetch users and display the first page
fetchUsers();