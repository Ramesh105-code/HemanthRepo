async function filterUsersByDomain(domain) {
    try {
      const response = await fetch("https://your-project-id.firebaseio.com/users.json"); 
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
      if (!data) return console.log("No users found.");
  
      const filteredUsers = Object.values(data).filter(user => user.email.endsWith(domain));
  
      console.log("Filtered Users:", filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  
  filterUsersByDomain("@example.com");
  