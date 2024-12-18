const paginateUsers = (page, itemsPerPage = 5) => {
    // Ensure page is a valid number
    if (page < 1 || isNaN(page)) {
      console.error("Invalid page number. Page number must be a positive integer.");
      return;
    }
  
    fetch("URL")  // Replace "URL" with your actual Firebase or API URL
      .then(response => response.json())
      .then(data => {
        const users = Object.values(data);  // Convert object to array of users
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(users.length / itemsPerPage);
  
        // Ensure page number does not exceed the total number of pages
        if (page > totalPages) {
          console.error("Page number exceeds total pages.");
          return;
        }
  
        // Calculate start and end indexes based on the current page
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
  
        // Slice the users array to get the users for the current page
        const paginatedUsers = users.slice(start, end);
        
        console.log(`Users on page ${page}:`, paginatedUsers);
      })
      .catch(error => console.error("Error fetching data:", error));
  };
  
  // Example usage
  paginateUsers(1); // Fetch users on page 1
  paginateUsers(2); // Fetch users on page 2
  