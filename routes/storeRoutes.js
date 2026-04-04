const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

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
router.get('/', storeController.getAllStores);

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
router.get('/:id', storeController.getSingleStore);
// POST: Create a new store
router.post('/', storeController.createNewStore);

router.delete>('/:id', storeController.deleteStore);

module.exports = router;