import express from "express";
import {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - projectId
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         projectId:
 *           type: string
 *           description: ID of the project this task belongs to
 *         title:
 *           type: string
 *           description: Task title
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           description: Current status of the task
 *         assignedTo:
 *           type: string
 *           description: ID of the user assigned to this task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: Task priority
 *       example:
 *         projectId: 60d0fe4f5311236168a109ca
 *         title: Implement Login Feature
 *         description: Create REST endpoints for user authentication
 *         status: in-progress
 *         assignedTo: 60d0fe4f5311236168a109cb
 *         priority: high
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The task managing API
 */

/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/create", createTask);

/**
 * @swagger
 * /api/task/get:
 *   get:
 *     summary: Returns the list of all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/get", getAllTask);

/**
 * @swagger
 * /api/task/get/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Task data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get("/get/:id", getTaskById);

/**
 * @swagger
 * /api/task/update/{id}:
 *   put:
 *     summary: Update task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was updated
 *       404:
 *         description: Task not found
 *       500:
 *         description: Some error happened
 */
router.put("/update/:id", updateTask);

/**
 * @swagger
 * /api/task/delete/{id}:
 *   delete:
 *     summary: Delete task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/delete/:id", deleteTask);
export default router;
