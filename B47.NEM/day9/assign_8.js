const express = require("express");
const Order = require("../models/order.model");
const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/top-products", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$productName", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 3 },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/revenue-by-category", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$category", totalRevenue: { $sum: "$totalPrice" } } },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/average-order-value", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, averageOrderValue: { $avg: "$totalPrice" } } },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.json(result[0]);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/orders-per-month", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/cancellation-rate", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          cancellationRate: {
            $multiply: [
              { $divide: ["$cancelledOrders", "$totalOrders"] },
              100,
            ],
          },
        },
      },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.json(result[0]);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
