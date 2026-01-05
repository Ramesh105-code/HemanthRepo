fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    const sortData = data
    .sort((a, b)  =>
      a.address.city.localeCompare(b.address.city)
    )
    .map(item => ({
        name: item.name,
        city: item.address.city
    }));
    console.log(sortData)
     });