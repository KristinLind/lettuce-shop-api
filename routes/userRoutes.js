const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidationRules, validate } = require('../middleware/validate');
const { ensureAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/user'
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single user
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/user'
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getSingleUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new User
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', ensureAuthenticated, userValidationRules(), validate, userController.createUser); // ✅ matches our resolved controller

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put('/:id', ensureAuthenticated, userValidationRules(), validate, userController.updateUser); // ✅ fixed from router.post

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', ensureAuthenticated, userController.deleteUser);

module.exports = router;