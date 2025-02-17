import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function filterUsersByDomain(domain) {
  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = Object.values(snapshot.val()); // Convert object to array
      const filteredUsers = users.filter(user => 
        user.email.endsWith(domain)
      );

      console.log(filteredUsers);
    } else {
      console.log("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Example usage
filterUsersByDomain("@example.com");