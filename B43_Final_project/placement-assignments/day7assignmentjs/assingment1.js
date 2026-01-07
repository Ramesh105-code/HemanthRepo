async function fetchUserPostComments() {
  
  const userRes = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await userRes.json();

  const postsRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
  );
  const posts = await postsRes.json();

  const firstPost = posts[0];

  const commentsRes = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${firstPost.id}`
  );
  const comments = await commentsRes.json();

 
  return {
    userName: user.name,
    firstPostTitle: firstPost.title,
    commentCount: comments.length,
    topComment: comments[0]?.body || null
  };
}

fetchUserPostComments().then(console.log);
