const router = require("express").Router();
const db = require("../../models");

router.get("/", async (req, res) => {
  try {
    const workouts = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]);
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/range", async (req, res) => {
  try {
    const lastSevenWorkouts = (
      await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ])
        .sort({ _id: "descending" })
        .limit(7)
    ).reverse();
    res.status(200).json(lastSevenWorkouts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const workout = await db.Workout.create(req.body);
    res.json(workout);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateResult = await db.Workout.updateOne(
      { _id: req.params.id },
      {
        $push: {
          exercises: req.body,
        },
      }
    );
    res.json(updateResult);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
