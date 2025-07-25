const express = require("express");
const WatchHistory = require("../models/watchHistory.model");
const router = express.Router();

router.post("/watch-history", async (req, res) => {
  try {
    const record = new WatchHistory(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/top-movies", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$movie", totalWatchTime: { $sum: "$watchTime" } } },
      { $sort: { totalWatchTime: -1 } },
      { $limit: 5 }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/genre-popularity", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$genre", totalWatchTime: { $sum: "$watchTime" } } },
      { $sort: { totalWatchTime: -1 } }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/user-engagement", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$username", avgWatchTime: { $avg: "$watchTime" } } },
      { $sort: { avgWatchTime: -1 } }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/subscription-watchtime", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$subscriptionType", totalWatchTime: { $sum: "$watchTime" } } }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/highest-rated-movies", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      {
        $group: {
          _id: "$movie",
          avgRating: { $avg: "$rating" },
          totalWatchTime: { $sum: "$watchTime" },
        }
      },
      { $sort: { avgRating: -1 } },
      { $limit: 3 }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
