let users = [];
let currentPage = 1;
const usersPerPage = 5;

async function fetchUsers() {
  try {
    const response = await fetch("https://your-project-id.firebaseio.com/users.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    if (!data) return console.log("No users found.");

    users = Object.values(data);
    displayPage(currentPage);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function displayPage(page) {
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const pageUsers = users.slice(startIndex, endIndex);

  console.log(`Page ${page}:`, pageUsers);
}

function nextPage() {
  if (currentPage * usersPerPage < users.length) {
    currentPage++;
    displayPage(currentPage);
  } else {
    console.log("No more users.");
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  } else {
    console.log("Already on the first page.");
  }
}


fetchUsers();
