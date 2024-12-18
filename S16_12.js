import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.x/firebase-database.js";

//Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const usersPerPage = 5; // Number of users per page
let currentPage = 1; // Start on the first page
let users = []; // Store all user data

/**
 * Fetch all users from Firebase Realtime Database.
 */
async function fetchUsers() {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "users"));
    if (snapshot.exists()) {
      // Convert the users object to an array
      users = Object.values(snapshot.val());
      displayPage(currentPage);
    } else {
      console.log("No users found in the database.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

/**
 * Display the users for the current page.
 * @param {number} page - The current page number.
 */
function displayPage(page) {
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  // Slice the array to get the users for the current page
  const pageUsers = users.slice(startIndex, endIndex);

  console.log(`Page ${page}:`, pageUsers);

  // Handle navigation availability
  if (pageUsers.length === 0) {
    console.log("No users to display on this page.");
  } else {
    console.log("Use 'nextPage()' or 'prevPage()' to navigate.");
  }
}

/**
 * Navigate to the next page.
 */
function nextPage() {
  if (currentPage * usersPerPage < users.length) {
    currentPage++;
    displayPage(currentPage);
  } else {
    console.log("You are already on the last page.");
  }
}

/**
 * Navigate to the previous page.
 */
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  } else {
    console.log("You are already on the first page.");
  }
}

// Fetch and display users
fetchUsers();

// Example usage:
// Call `nextPage()` to go to the next page, and `prevPage()` to go to the previous page.
