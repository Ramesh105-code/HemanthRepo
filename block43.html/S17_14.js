const URL = "https://your-project-id.firebaseio.com/users.json";

async function paginateUsers(page, itemsPerPage = 5) {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    if (!data) return console.log("No users found.");

    
    const usersArray = Object.values(data);
    const totalUsers = usersArray.length;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

   
    if (page < 1 || page > totalPages) {
      return console.log("Invalid page number. Please select a valid page.");
    }
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    
    const paginatedUsers = usersArray.slice(start, end);
    console.log(`Page ${page} of ${totalPages}:`, paginatedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}


paginateUsers(1);
paginateUsers(2); 
