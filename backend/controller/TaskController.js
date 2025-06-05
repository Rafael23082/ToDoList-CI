const TaskModel = require("../models/TaskModel")

const getTasks = async(req, res) => {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
}

const createTask = async(req, res) => {
    try{
        const {taskName, userId} = req.body;
        const task = await TaskModel.findOne({
            taskName: taskName,
            userId: userId
        })

        if (!task){
            const newTask = await TaskModel.create({
                taskName: taskName,
                isCompleted: false,
                userId: userId
            })
            res.status(200).json(newTask);
        } else {
            res.status(500).json({message: "Task Already Exists"})
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;

        const userTasks = await TaskModel.find({
            userId: userId 
        });

        res.status(200).json(userTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const editTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData);

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found!" });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deletedTask) res.status(404).json({message: "Task not found!"})
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {getTasks, createTask, getUserTasks, editTask, deleteTask};