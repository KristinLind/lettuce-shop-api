const express = require('express');
const router = express.Router();
const { getAllItems, getSingleItem } = require('../controllers/itemController');

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
router.get('/', getAllItems);

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
router.get('/:id', getSingleItem);

module.exports = router;