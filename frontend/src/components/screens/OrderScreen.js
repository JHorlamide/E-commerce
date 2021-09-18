import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import {
	Button,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Alert,
} from 'react-bootstrap';

import {
	getOrderDetails,
	payOrder,
	orderPayReset,
	orderDeliveredReset,
	deliverOrder,
} from '../../actions/orderAction';

/* Custom Component */
import Loader from '../layouts/Loader';

const OrderScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const orderId = match.params.id;
	const [sdkReady, setSdkReady] = useState(false);

	/* Get logged in user from state */
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	/* Get order details from state */
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading } = orderDetails;

	/* Get pay order details from state */
	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, loading: loadingPay } = orderPay;

	/* Get delivered order details from state */
	const orderDelivered = useSelector((state) => state.orderDelivered);
	const { success: successDelivered, loading: loadingDelivered } =
		orderDelivered;

	/* To ensure the order is loaded */
	if (!loading && order) {
		/* Calculate Prices */
		const addDecimal = (number) => {
			return (Math.round(number * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimal(
			order.orderItems.reduce((acc, item) => {
				return acc + item.price * item.qty;
			}, 0)
		);
	}

	useEffect(() => {
		if (!userInfo) history.push('/login');

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};

			document.body.appendChild(script);
		};

		if (!order || successPay || successDelivered) {
			dispatch(orderPayReset());
			dispatch(orderDeliveredReset());
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [
		dispatch,
		orderId,
		order,
		successPay,
		successDelivered,
		history,
		userInfo,
	]);

	/* Successful payment of order */
	const successPaymentHandler = (paymentResult) => {
		console.log('PayPal Payment Result: ', paymentResult);

		dispatch(payOrder(orderId, paymentResult));
	};

	const deliveredHandler = () => {
		dispatch(deliverOrder(orderId));
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<h2 className='text-uppercase font-weight-bold'>
				Order {order ? order._id : ''}
			</h2>

			<Row>
				{/* Item Details */}
				<Col md={8}>
					<ListGroup variant='flush'>
						{/* Shipping Address */}
						<ListGroup.Item>
							<h2 className='text-uppercase'>Shipping</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a
									className='text-decoration-none'
									href={`mailto:${order.user.email}`}
								>
									{order.user.email}
								</a>
							</p>

							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}.
							</p>

							{/* Check to see if user has paid */}
							{order.isDelivered ? (
								<Alert variant='success'>
									Delivered at {order.deliveredAt}
								</Alert>
							) : (
								<Alert variant='danger'>Not Delivered</Alert>
							)}
						</ListGroup.Item>

						{/* Payment Method */}
						<ListGroup.Item>
							<h2 className='text-uppercase'>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>

							{/* Check to see if user has paid */}
							{order.isPaid ? (
								<Alert variant='success'>Paid On {order.paidAt}</Alert>
							) : (
								<Alert variant='danger'>Not Paid</Alert>
							)}
						</ListGroup.Item>

						{/* Order Items */}
						<ListGroup.Item>
							<h2 className='text-uppercase'>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<h2>Order is empty</h2>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => {
										return (
											<ListGroup.Item key={index}>
												<Row>
													{/* Item Image */}
													<Col md={1}>
														<Image
															src={item.image}
															alt={item.name}
															fluid
															rounded
														/>
													</Col>

													{/* Item Name */}
													<Col>
														<Link
															className='text-decoration-none text-dark'
															to={`/product/${item.product}`}
														>
															{item.name}
														</Link>
													</Col>

													{/* Item Quantity & Price*/}
													<Col md={4}>
														{item.qty} x ${item.price} = $
														{item.qty * item.price}
													</Col>
												</Row>
											</ListGroup.Item>
										);
									})}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				{/* Item Price Details */}
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>

							{/* Item Price */}
							<ListGroup.Item>
								<Row>
									<Col>Items Price:</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* Shipping Price */}
							<ListGroup.Item>
								<Row>
									<Col>Shipping Price:</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* Tax Price */}
							<ListGroup.Item>
								<Row>
									<Col>Tax Price:</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* Total Price */}
							<ListGroup.Item>
								<Row>
									<Col>
										<strong>Total:</strong>
									</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* PayPal button */}
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}

							{loadingDelivered && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block'
											onClick={deliveredHandler}
										>
											Mark As Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
