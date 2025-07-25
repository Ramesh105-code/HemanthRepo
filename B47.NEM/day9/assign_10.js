const express = require("express");
const Workout = require("../models/workout.model");
const router = express.Router();

router.post("/workouts", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/top-workouts", async (req, res) => {
  try {
    const result = await Workout.aggregate([
      { $group: { _id: "$workoutType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/average-calories", async (req, res) => {
  try {
    const result = await Workout.aggregate([
      { $group: { _id: "$workoutType", avgCalories: { $avg: "$caloriesBurned" } } },
      { $sort: { avgCalories: -1 } }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/intensity-distribution", async (req, res) => {
  try {
    const result = await Workout.aggregate([
      { $group: { _id: "$intensity", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/weekly-activity", async (req, res) => {
  try {
    const result = await Workout.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$workoutDate" },
          workouts: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/analytics/top-performing-users", async (req, res) => {
  try {
    const result = await Workout.aggregate([
      { $group: { _id: "$username", totalDuration: { $sum: "$duration" } } },
      { $sort: { totalDuration: -1 } },
      { $limit: 5 },
    ]);
    if (!result.length) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
