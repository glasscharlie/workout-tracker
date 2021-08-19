const router = require("express").Router();
const Workout = require("../models/workouts.js");

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields:{
        totalDuration:{
            $sum:"$exercises.duration"
        }
    }}])
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.post("/api/workouts", (req, res) => {
      console.log(req.body)
    Workout.create(req.body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.put("/api/workouts/:id", (req,res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        {$push:{
            exercises:req.body
        }}).then((dbWorkout) =>{
        res.json(dbWorkout)
    })
    .catch((err) =>{
        res.json(err)
    })
})

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
        $addFields:{
        totalDuration:{
            $sum:"$exercises.duration"
        }
    }
    }])
      .then(dbTransaction => {
        res.json(dbTransaction);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });



module.exports = router;