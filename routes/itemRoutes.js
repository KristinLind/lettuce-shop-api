const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of all items
 */
router.get('/', itemController.getAllItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single item
 *       404:
 *         description: Item not found
 */
router.get('/:id', itemController.getSingleItem);

// POST: Create a new item
router.post('/', itemController.createItem);


router.delete('/:id', itemController.deleteItem);

module.exports = router;