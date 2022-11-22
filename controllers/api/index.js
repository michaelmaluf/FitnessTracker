const router = require("express").Router();
const workoutsRoutes = require("./workouts-routes");

router.use("/workouts", workoutsRoutes);

module.exports = router;
