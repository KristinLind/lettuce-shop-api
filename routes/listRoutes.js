const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: List of all lists
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                      $ref: '#/components/schemas/List'
 */
router.get('/', listController.getAllLists);

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get a single list by ID
 *     tags: [Lists]
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
 *                      $ref: '#/components/schemas/List'
 *       404:
 *         description: List not found
 */
router.get('/:id', listController.getSingleList);

/**
 * @swagger
 * /lists/user/{userId}:
 *   get:
 *     summary: Get all lists for a specific user
 *     tags: [Lists]
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
 *                      $ref: '#/components/schemas/List'
 *       404:
 *         description: User not found
 */
router.get('/user/:userId', listController.getListsByUser);
// POST: Create a new list
router.post('/', listController.createList);

/**
 * @swagger
 * /Lists:
 *   post:
 *     summary: Create a new list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       201:
 *         description: List created
 */
router.post('/', listController.createList);

/**
 * @swagger
 * /Lists/{id}:
 *   put:
 *     summary: Update a list
 *     tags: [Lists]
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
 * /Lists/{id}:
 *   delete:
 *     summary: Delete a list
 *     tags: [Lists]
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