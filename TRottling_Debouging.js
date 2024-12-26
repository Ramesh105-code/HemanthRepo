// HTML Setup
const appContainer = document.createElement('div');
appContainer.innerHTML = `
  <div>
    <input id="search-bar" type="text" placeholder="Search here...">
    <div id="results"></div>
  </div>
  <div>
    <button id="click-me">Click Me!</button>
    <div id="counter">0</div>
  </div>
`;
document.body.appendChild(appContainer);

// CSS Styles (for a better user experience)
const style = document.createElement('style');
style.textContent = `
  #search-bar {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
  }
  #results {
    margin: 10px 0;
    border: 1px solid #ccc;
    padding: 10px;
  }
  #click-me {
    margin: 10px 0;
    padding: 10px;
    background-color: lightblue;
    border: none;
    cursor: pointer;
  }
  #counter {
    font-size: 20px;
    font-weight: bold;
  }
`;
document.head.appendChild(style);

// JavaScript Implementation

// Helper for debouncing
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Helper for throttling
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// API Fetch Functions
const fetchMovies = async (query) => {
  const apiKey = "YOUR_API_KEY"; // Replace with your TMDb API key
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  return data.results ? data.results.map(movie => movie.title) : [];
};

const fetchCities = async (query) => {
  const response = await fetch(`https://api.teleport.org/api/cities/?search=${query}`);
  const data = await response.json();
  return data._embedded ? data._embedded["city:search-results"].map(city => city.matching_full_name) : [];
};

// DOM Elements
const searchBar = document.getElementById("search-bar");
const resultsDiv = document.getElementById("results");
const clickButton = document.getElementById("click-me");
const counterDiv = document.getElementById("counter");

// Event Listeners
let counter = 0;
const updateCounter = throttle(() => {
  counter++;
  counterDiv.textContent = counter;
}, 2000);

const handleSearch = debounce(async (event) => {
  const query = event.target.value.trim();
  if (!query) {
    resultsDiv.textContent = "";
    return;
  }

  resultsDiv.textContent = "Loading...";
  try {
    const movies = await fetchMovies(query);
    const cities = await fetchCities(query);

    const allResults = [...movies, ...cities];
    resultsDiv.innerHTML = allResults.length
      ? allResults.map(item => `<div>${item}</div>`).join("")
      : "No results found.";
  } catch (error) {
    resultsDiv.textContent = "Error fetching results.";
  }
}, 300);

searchBar.addEventListener("input", handleSearch);
clickButton.addEventListener("click", updateCounter);
