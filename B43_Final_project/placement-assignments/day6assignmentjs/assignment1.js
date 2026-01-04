fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    const result = users
      .filter((user) => user.username.length > 6)
      .map((user) => ({
        id: user.id,
        fullName: user.name,
        email: user.email,
      }));

    console.log(result);
  })
  .catch((err) => console.error(err));
