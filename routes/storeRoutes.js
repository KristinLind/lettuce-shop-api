const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores
 *     tags: [stores]
 *     responses:
 *       200:
 *         description: List of all stores
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/store'
 */
router.get('/', storeController.getAllStores);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get a single store by ID
 *     tags: [stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single store
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/store'
 *       404:
 *         description: Store not found
 */
router.get('/:id', storeController.getSingleStore);

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a new Store
 *     tags: [stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/store'
 *     responses:
 *       201:
 *         description: Store created
 */
router.post('/', storeController.createStore); // ✅ matches our resolved controller

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Update a store
 *     tags: [stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store updated
 *       404:
 *         description: Store not found
 */
router.put('/:id', storeController.updateStore);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: Delete a store
 *     tags: [stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *       404:
 *         description: Store not found
 */
router.delete('/:id', storeController.deleteStore);

module.exports = router;