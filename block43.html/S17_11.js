const firebaseUrl = "https://your-project-id.firebaseio.com/users.json"; 

async function searchUsers(searchTerm) {
  try {
    const response = await fetch(firebaseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    
    if (!data) {
      console.log("No users found.");
      return;
    }

    const usersArray = Object.values(data); 

    const filteredUsers = usersArray.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}


searchUsers("john");
