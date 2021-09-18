import asyncMiddleware from '../middlewares/async.js';
import { Order } from '../models/Order.js';
// import { orderItemsValidation } from '../models/Order.js';

/***
 * @router  POST: api/orders
 * @desc    Create new order.
 * ***/
export const addOrderItem = asyncMiddleware(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		totalPrice,
		shippingPrice,
		taxPrice,
		itemsPrice,
	} = req.body;

	// const { error } = orderItemsValidation(req.body);
	// if (error) {
	//   console.log(error.details[0].message);
	//   return res.status(400).json({ message: error.details[0].message });
	// }

	/* Check to see if order items is not empty */
	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No Order Items');
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			totalPrice,
			shippingPrice,
			taxPrice,
			itemsPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

/***
 * @router  GET: api/orders/id
 * @desc    Get order by id
 * @access  Private
 * ***/
export const getOrderById = asyncMiddleware(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

/***
 * @router  PUT: api/orders/:id/pay
 * @desc    Update order to paid
 * @access  Private
 * ***/
export const updateOrderToPaid = asyncMiddleware(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			/* Comes from the PayPal API */
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

/***
 * @router  PUT: api/orders/:id/delivered
 * @desc    Update order to delivered
 * @access  Private/Admin
 * ***/
export const updateOrderToDelivered = asyncMiddleware(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

/***
 * @router  GET: /api/orders/myorders
 * @desc    Get logged in user orders
 * @access  Private
 * ***/
export const getUserOrders = asyncMiddleware(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

/***
 * @router  GET: /api/orders
 * @desc    Get all orders
 * @access  Private/Admin
 * ***/
export const getOrders = asyncMiddleware(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');

	res.json(orders);
});
