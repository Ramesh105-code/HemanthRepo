// Initialize Firebase (replace with your Firebase config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "https://your-database-url.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to paginate users from Firebase Realtime Database
const paginateUsers = (page, itemsPerPage = 5) => {
  // Validate the page number
  if (page < 1) {
    console.error("Invalid page number. Page must be greater than or equal to 1.");
    return;
  }

  const start = (page - 1) * itemsPerPage;  // Correct formula to calculate start index
  const end = start + itemsPerPage;

  // Reference to the 'users' node in Firebase Realtime Database
  const usersRef = firebase.database().ref('users');

  // Fetch the users from Firebase
  usersRef.once('value')
    .then(snapshot => {
      const users = snapshot.val();
      if (users) {
        // Convert the Firebase object into an array
        const userArray = Object.values(users);
        
        // Paginate users by slicing the array to the correct range
        const paginatedUsers = userArray.slice(start, end);
        
        // Handle case where no users are found for the page
        if (paginatedUsers.length === 0) {
          console.log("No users to display for this page.");
        } else {
          console.log("Users on this page:", paginatedUsers);
        }
      } else {
        console.error("No users found in the database.");
      }
    })
    .catch(error => {
      console.error("Error fetching data from Firebase:", error);
    });
};

// Example usage: Paginate for the first page with 5 items per page
paginateUsers(1);  // First page
