import express from 'express';
import { auth, admin } from '../middlewares/auth.js';
const router = express.Router();

/* Controllers */
import {
	addOrderItem,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getUserOrders,
	getOrders,
} from '../controllers/order.js';

/***
 * @router  GET: api/orders
 * @desc    Get all orders.
 * ***/
router.get('/', [auth, admin], getOrders);

/***
 * @router  POST: api/orders
 * @desc    Create new order.
 * ***/
router.post('/', auth, addOrderItem);

/***
 * @router  PUT: api/orders/id/pay
 * @desc    Update order to paid.
 * ***/
router.get('/myorders', auth, getUserOrders);

/***
 * @router  GET: api/orders/:id
 * @desc    Get order by Id.
 * ***/
router.get('/:id', auth, getOrderById);

/***
 * @router  PUT: api/orders/:id/pay
 * @desc    Update order to paid.
 * ***/
router.put('/:id/pay', auth, updateOrderToPaid);

/***
 * @router  PUT: api/orders/:id/delivered
 * @desc    Update order to delivered.
 * ***/
router.put('/:id/delivered', [auth, admin], updateOrderToDelivered);

export default router;
