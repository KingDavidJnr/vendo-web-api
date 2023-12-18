const express = require('express');
const router = express.Router();
const OrderController = require('../controller/orderController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /order/vendor:
 *   get:
 *     summary: Get all orders for a specific vendor
 *     description: Retrieve all orders for the authenticated vendor, including the count of orders for each product.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: Vendor orders retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               orders:
 *                 - order: {...}  # Order details
 *               productOrderCountMap:
 *                 key1: 1  # Product ID and order count
 *                 key2: 2
 */

/**
 * @swagger
 * /order/customer:
 *   get:
 *     summary: Get all orders for a specific customer
 *     description: Retrieve all orders for the authenticated customer.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: Customer orders retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               orders:
 *                 - order: {...}  # Order details
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order by a customer
 *     description: Create a new order for the authenticated customer.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductOrder'
 *               totalAmount:
 *                 type: number
 *             required:
 *               - products
 *               - totalAmount
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               order: {...}  # Details of the newly created order
 */

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get a single order by ID
 *     description: Retrieve details of a specific order by its ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               order: {...}  # Details of the order
 *       404:
 *         description: Order not found
 *       403:
 *         description: Forbidden - User does not have permission to view the order
 */

// Get all orders for a specific vendor
router.get('/vendor', OrderController.getVendorOrders);

// Get all orders for a specific customer
router.get('/customer', OrderController.getCustomerOrders);

// Create a new order by a customer
router.post('/', OrderController.createCustomerOrder);

// Get a single order by ID
router.get('/:orderId', OrderController.getOrderById);

module.exports = router;
