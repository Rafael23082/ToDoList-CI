const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const TaskModel = mongoose.model("Task", TaskSchema)
module.exports = TaskModel;