const express = require('express');
const router = express.Router();
const { getAllLists, getSingleList } = require('../controllers/listController');

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: List of all lists
 */
router.get('/', getAllLists);

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
 *       404:
 *         description: List not found
 */
router.get('/:id', getSingleList);

module.exports = router;