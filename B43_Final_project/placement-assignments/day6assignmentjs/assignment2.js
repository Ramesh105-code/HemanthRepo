Promise.all([
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
  fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json()),
])
  .then(([users, posts]) => {
    const result = users.map((user) => {
      const userPosts = posts.filter(
        (post) => post.userId === user.id
      );

      return {
        userId: user.id,
        name: user.name,
        postCount: userPosts.length,
      };
    });

    console.log(result);
  })
  .catch((err) => console.error(err));
