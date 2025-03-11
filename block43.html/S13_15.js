const axios = require('axios');

const API_URL = 'https://jsonplaceholder.typicode.com/posts';


async function fetchPosts() {
  try {
    const response = await axios.get(API_URL);
    console.log(`First Post Title: ${response.data[0].title}`);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}


async function createPost() {
  try {
    const newPost = {
      title: 'Automated Test Post',
      body: 'Testing API endpoints via Node.js script.',
      userId: 123
    };

    const response = await axios.post(API_URL, newPost);
    console.log(`New Post Created with ID: ${response.data.id}`);
  } catch (error) {
    console.error('Error creating post:', error.message);
  }
}


async function runTests() {
  console.log('Starting API Tests...');
  await fetchPosts();
  await createPost();
}

runTests();
