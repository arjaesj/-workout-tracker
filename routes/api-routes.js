const router = require("express").Router();
const path = require("path");

const db = require("../models/indexSchema")


// ------------HTML ROUTES -------------//

// landing page
router.get("/", (req, res) => {
    const statPage = "../views/index.html"
    res.sendFile(path.join(__dirname, statPage))
})

// create new workout page
router.get("/exercise", (req, res) => {
    const exPage = "../views/exercise.html"
    res.sendFile(path.join(__dirname, exPage))
})

// workout tracking page
router.get("/stats", (req, res) => {
    const statPage = "../views/stats.html"
    res.sendFile(path.join(__dirname, statPage))
})

// -------------API ROUTES -------------//

// api route to find the last workout 
router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbData => {
        res.json(dbData)
    }).catch(err => {
        res.json(err)
    });
});

// api route to create new workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbData => {
            res.json(dbData)
        }).catch(err => {
            res.json(err);
        });
});


// api route to find all workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbData => {
            res.json(dbData)
        }).catch(err => {
            res.json(err)
        })
})

// api route to update workout using id
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne(
        {
            "_id": req.params.id
        },
        {
            $push: { "exercises": req.body }
        },
        (err, updated) => {
            if (err) res.status(500).json(err);
            res.json(updated);
        });
});

module.exports = router;