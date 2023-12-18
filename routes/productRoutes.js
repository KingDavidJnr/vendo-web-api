// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product as a vendor.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               product: <product details>
 */

router.post('/create', ProductController.createProduct);

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products available to vendors and customers.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               products: [<product 1>, <product 2>, ...]
 */

router.get('/all', ProductController.getAllProducts);

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve details of a specific product by ID available to vendors and customers.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               product: <product details>
 *       404:
 *         description: Product not found
 */

router.get('/:productId', ProductController.getProductById);

/**
 * @swagger
 * /product/update/{productId}:
 *   put:
 *     summary: Update product by ID
 *     description: Update details of a specific product by ID as a vendor.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               product: <updated product details>
 *       403:
 *         description: Forbidden - Only the vendor who created the product can update it
 *       404:
 *         description: Product not found
 */

router.put('/update/:productId', ProductController.updateProduct);

/**
 * @swagger
 * /product/delete/{productId}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Delete a specific product by ID as a vendor.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: Forbidden - Only the vendor who created the product can delete it
 *       404:
 *         description: Product not found
 */

router.delete('/delete/:productId', ProductController.deleteProduct);

module.exports = router;
