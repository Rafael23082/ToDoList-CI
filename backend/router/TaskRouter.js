const express = require("express");
const TaskController = require("../controller/TaskController.js");

const TaskRouter = express.Router();

TaskRouter.get("/getTasks", TaskController.getTasks);

/**
 * @swagger
 * /api/task/getTasks:
 *  get:
 *      summary: Get all tasks.
 *      responses:
 *          200: 
 *              description: Tasks retrieved successfully.
 * 
 */

TaskRouter.post("/", TaskController.createTask);

/**
 * @swagger
 * /api/task:
 *  post:
 *      summary: Create a task.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          taskName:
 *                              Type: string
 *                          userId:
 *                              type: string
 *      responses:
 *          200:
 *              description: Task created successfully.
 *          500:
 *              description: Task already exists, or an error occured.
 */

TaskRouter.get("/getUserTasks/:userId", TaskController.getUserTasks);

/**
 * @swagger
 * /api/task/getUserTasks/{userId}:
 *   get:
 *     summary: Get the tasks of a user, given the user ID.
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully.
 *       500:
 *         description: Invalid user or an error occurred.
 */


TaskRouter.put("/updateTask/:taskId", TaskController.editTask);

/**
 * @swagger
 * /api/task/updateTask/{taskId}:
 *   put:
 *     summary: Updates the content of a task.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               taskName:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       500:
 *         description: An error occured.
 */

TaskRouter.delete("/deleteTask/:taskId", TaskController.deleteTask);

/**
 * @swagger
 * /api/task/deleteTask/{taskId}:
 *   delete:
 *     summary: To delete a task, given its id.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task successfully deleted.
 *       500: 
 *         description: An error occured.
 */

module.exports = TaskRouter;