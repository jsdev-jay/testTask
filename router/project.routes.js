import express from "express";
import {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - ownerId
 *         - name
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the project
 *         ownerId:
 *           type: string
 *           description: ID of the user who owns the project
 *         name:
 *           type: string
 *           description: Project name
 *         title:
 *           type: string
 *           description: Project title
 *         description:
 *           type: string
 *           description: Detailed description of the project
 *         developers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [frontend, backend]
 *       example:
 *         ownerId: 60d0fe4f5311236168a109ca
 *         name: TaskManager
 *         title: Task Management System
 *         description: A system to manage daily tasks efficiently
 *         developers: [{ name: "Alice", role: "backend" }, { name: "Bob", role: "frontend" }]
 */

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The internal software projects managing API
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: The project was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/", createProject);

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Returns the list of all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: The list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/", getAllProject);

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: Project data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */
router.get("/:id", getProjectById);

/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Update project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The project was updated
 *       404:
 *         description: Project not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", updateProject);

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete("/:id", deleteProject);
export default router;
