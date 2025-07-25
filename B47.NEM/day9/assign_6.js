
db.sales.aggregate([
  { $group: { _id: "$category", totalSales: { $sum: "$amount" } } }
]);

db.sales.aggregate([
  {
    $group: {
      _id: { $substr: ["$date", 0, 7] }, 
      totalSales: { $sum: "$amount" }
    }
  },
  { $sort: { "_id": 1 } }
]);

db.sales.aggregate([
  { $group: { _id: "$product", totalRevenue: { $sum: "$amount" } } },
  { $sort: { totalRevenue: -1 } },
  { $limit: 1 }
]);

db.sales.aggregate([
  { $group: { _id: null, averageAmount: { $avg: "$amount" } } }
]);

db.sales.aggregate([
  {
    $group: {
      _id: { $substr: ["$date", 0, 7] }, 
      salesCount: { $sum: 1 }
    }
  },
  { $sort: { "_id": 1 } }
]);

db.sales.aggregate([
  { $group: { _id: "$region", totalSales: { $sum: "$amount" } } }
]);

db.sales.aggregate([
  { $group: { _id: "$product", totalRevenue: { $sum: "$amount" } } },
  { $sort: { totalRevenue: -1 } },
  { $limit: 3 }
]);

db.sales.aggregate([
  { $group: { _id: "$category", transactionCount: { $sum: 1 } } }
]);

db.sales.aggregate([
  { $group: { _id: "$region", averageSales: { $avg: "$amount" } } }
]);

db.sales.aggregate([
  { $match: { category: { $in: ["Electronics", "Fashion"] } } },
  { $group: { _id: "$category", totalSales: { $sum: "$amount" } } }
]);
