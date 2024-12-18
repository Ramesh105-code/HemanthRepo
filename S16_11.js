// Import Firebase SDK
// Add Firebase CDN to your HTML file or install via npm
// Example:
// <script src="https://www.gstatic.com/firebasejs/9.x/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.x/firebase-database.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.x/firebase-database.js";

// Firebase configuration
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

/**
 * Fetch and filter users from Firebase Realtime Database.
 * @param {string} searchTerm - The term to search for (case-insensitive).
 */
async function searchUsers(searchTerm) {
  try {
    // Reference to the 'users' node in the database
    const dbRef = ref(database);

    // Fetch all users
    const snapshot = await get(child(dbRef, "users"));
    if (snapshot.exists()) {
      const users = snapshot.val();

      // Convert the users object to an array for filtering
      const usersArray = Object.values(users);

      // Filter users by name (case-insensitive)
      const filteredUsers = usersArray.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Log the filtered results to the console
      console.log(filteredUsers);
    } else {
      console.log("No users found in the database.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Example usage
const searchTerm = "john"; // Replace with your search term
searchUsers(searchTerm);
