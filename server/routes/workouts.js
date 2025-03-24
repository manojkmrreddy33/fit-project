import express from "express";
import Workout from "../models/Workout.js";
import authMiddleware from "../middleware/verifyToken.js";


const router = express.Router();

router.post("/bulk-add", authMiddleware, async (req, res) => {
  try {
    const { workouts } = req.body;

    if (!workouts || workouts.length === 0) {
      return res.status(400).json({ message: "No workouts provided" });
    }

    const newWorkouts = workouts.map((workout) => ({
      ...workout,
      user: req.user.id
    }));

    await Workout.insertMany(newWorkouts);

    res.status(201).json({ message: "Workouts added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding workouts", error });
  }
});

export default router;
