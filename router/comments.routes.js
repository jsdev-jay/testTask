import express from "express";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../controller/comments.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - taskId
 *         - userId
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         taskId:
 *           type: string
 *           description: ID of the task
 *         userId:
 *           type: string
 *           description: ID of the user who commented
 *         comment:
 *           type: string
 *           description: The comment text content
 *       example:
 *         taskId: 60d0fe4f5311236168a109ca
 *         userId: 60d0fe4f5311236168a109cb
 *         comment: "This task needs to be prioritized."
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /api/comments/tasks/{taskId}/users/{userId}/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *             example:
 *               comment: This is a test comment from swagger.
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/tasks/:taskId/users/:userId/comments", createComment);

/**
 * @swagger
 * /api/comments/get:
 *   get:
 *     summary: Returns the list of all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/get", getAllComments);

/**
 * @swagger
 * /api/comments/update/{id}:
 *   put:
 *     summary: Update comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *             example:
 *               comment: This updated comment.
 *     responses:
 *       200:
 *         description: The comment was updated
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Some error happened
 */
router.put("/update/:id", updateComment);

/**
 * @swagger
 * /api/comments/delete/{id}:
 *   delete:
 *     summary: Delete comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/delete/:id", deleteComment);

export default router;
