const express = require("express");
const UserController = require("../controller/UserController.js")

const UserRouter = express.Router();

UserRouter.get("/getUserInfo/:userId", UserController.getUserInfo);

/**
 * @swagger
 * /api/user/getUserInfo/{userId}:
 *   get:
 *     description: Get user details given the Id.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data retrieval successful.
 *       404: 
 *         description: User invalid.
 *       500:
 *         description: An error occured.
 */

UserRouter.post("/", UserController.createUser);

/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Creates a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: An error occured. 
 */

UserRouter.post("/login", UserController.login);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     description: To validate user when logging in.
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200: 
 *         description: Login successful.
 *       404:
 *         description: User invalid.
 *       500:
 *         description: Error orccured. 
 */

UserRouter.put("/updateUser/:userId", UserController.changeUserDetails);

/**
 * @swagger
 * /api/user/updateUser/{userId}:
 *   put:
 *     description: Update user details given the user ID.
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: User details successfully changed.
 *       500: 
 *         description: An error occured.
 */

module.exports = UserRouter;