const orders = [
  {
    orderId: 'A1',
    customer: { name: 'John', location: { city: 'NYC', country: 'USA' } },
    items: [
      { product: 'Laptop', quantity: 1, price: 999 },
      { product: 'Mouse', quantity: 2, price: 25 }
    ]
  },
  {
    orderId: 'A2',
    customer: { name: 'Jane', location: { city: 'LA', country: 'USA' } },
    items: [
      { product: 'Keyboard', quantity: 1, price: 75 }
    ]
  }
];

const flattened = orders.map(order => {

  const customerName = order.customer.name;
  const city = order.customer.location.city;

  const totalAmount = order.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  return {
    orderId: order.orderId,
    customerName: customerName,
    city: city,
    totalAmount
  };
});

console.log(flattened);