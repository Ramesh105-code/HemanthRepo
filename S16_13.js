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
 * Fetch all users from Firebase Realtime Database and filter them by email domain.
 * @param {string} emailDomain - The email domain to filter users by (e.g., "@example.com").
 */
async function filterUsersByEmailDomain(emailDomain) {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "users"));
    
    if (snapshot.exists()) {
      // Convert the users object to an array
      const users = Object.values(snapshot.val());

      // Filter users whose email ends with the specified domain
      const filteredUsers = users.filter(user =>
        user.email.toLowerCase().endsWith(emailDomain.toLowerCase())
      );

      // Log the filtered users to the console
      console.log(filteredUsers);
    } else {
      console.log("No users found in the database.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Example usage: Filter users with email domain '@example.com'
filterUsersByEmailDomain('@example.com');
