const express = require('express');
const router = express.Router();
const { getAllStores, getSingleStore } = require('../controllers/storeController');

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: List of all stores
 */
router.get('/', getAllStores);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get a single store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single store
 *       404:
 *         description: Store not found
 */
router.get('/:id', getSingleStore);

module.exports = router;