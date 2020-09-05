const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const opt = { toJSON: { virtuals: true } } 

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                require: true
            },
            name: {
                type: String,
                trim: true,
                require: true
            },
            duration: {
                type: Number,
                trim: true,
                require: true

            },
            weight: {
                type: Number
            },
            reps: {
                type: Number

            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ],
},
    {
        toJSON: {
            virtuals: true
        }
    }
);

// defining a virtual attribute, to print the total workout duration after a new workout is added
WorkoutSchema.virtual("totalDuration").get(function () {
    // running reduce function to return a single output value for totalDuration
    return this.exercises.reduce((total, time) => {
        // returning total + time.duration
        return total + time.duration
    }, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;