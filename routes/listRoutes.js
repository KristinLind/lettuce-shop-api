const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     tags: [lists]
 *     responses:
 *       200:
 *         description: List of all lists
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/list'
 */
router.get('/', listController.getAllLists);

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get a single list by ID
 *     tags: [lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single list
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/list'
 *       404:
 *         description: List not found
 */
router.get('/:id', listController.getSingleList);

/**
 * @swagger
 * /lists/user/{userId}:
 *   get:
 *     summary: Get all lists for a specific user
 *     tags: [lists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's shopping lists
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/list'
 *       404:
 *         description: User not found
 */
router.get('/user/:userId', listController.getListsByUser);

// POST: Create a new list

/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Create a new list
 *     tags: [lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/list'
 *     responses:
 *       201:
 *         description: List created
 */
router.post('/', listController.createList);

/**
 * @swagger
 * /lists/{id}:
 *   put:
 *     summary: Update a list
 *     tags: [lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List updated
 *       404:
 *         description: list not found
 */
router.put('/:id', listController.updateList);

/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     summary: Delete a list
 *     tags: [lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List deleted successfully
 *       404:
 *         description: List not found
 */ 
router.delete('/:id', listController.deleteList);

module.exports = router;