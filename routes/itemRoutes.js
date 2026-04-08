const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const { itemValidationRules, validate } = require("../middleware/validate");
const { ensureAuthenticated } = require("../middleware/auth");

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [items]
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/item'
 */
router.get("/", itemController.getAllItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     tags: [items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/item'
 *       404:
 *         description: Item not found
 */
router.get("/:id", itemController.getSingleItem);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/item'
 *     responses:
 *       201:
 *         description: Item created
 */
router.post(
  "/",
  ensureAuthenticated,
  itemValidationRules(),
  validate,
  itemController.createItem,
);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     tags: [items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/item'
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */
router.put(
  "/:id",
  ensureAuthenticated,
  itemValidationRules(),
  validate,
  itemController.updateItem,
);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
router.delete("/:id", ensureAuthenticated, itemController.deleteItem);

module.exports = router;
