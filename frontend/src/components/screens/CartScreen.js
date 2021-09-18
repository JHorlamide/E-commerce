import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Button,
	Form,
	Card,
	Image,
	ListGroup,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../../actions/cartAction';
import axios from 'axios';

const CartScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	/* Get cart state */
	const cart = useSelector((state) => state.cart);

	/* Get cartItems from  cart */
	const { cartItems } = cart;

	useEffect(() => {
		const source = axios.CancelToken.source();
		if (productId) dispatch(addToCart(productId, qty, source));

		return () => {
			return source.cancel('Request canceled');
		};
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1 className='text-uppercase'>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<h1>
						Yor cart is empty <Link to='/'>Go Back</Link>
					</h1>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => {
							return (
								<ListGroup.Item key={item.product}>
									<Row>
										{/* Product Image */}
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>

										{/* Product Name */}
										<Col md={3}>
											<Link
												className='text-decoration-none text-dark'
												to={`/product/${item.product}`}
											>
												{item.name}
											</Link>
										</Col>

										{/* Product Price */}
										<Col md={2}>${item.price}</Col>

										{/* Quantity */}
										<Col md={2}>
											<Form.Control
												as='select'
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCart(item.product, Number(e.target.value))
													)
												}
											>
												{[...Array(item.numberInStock).keys()].map((key) => (
													<option
														className='dropdown-item'
														key={key + 1}
														value={key + 1}
													>
														{key + 1}
													</option>
												))}
											</Form.Control>
										</Col>

										{/* Remove Button */}
										<Col md={2}>
											<Button
												type='button'
												variant='secondary'
												onClick={() => removeFromCartHandler(item.product)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup>
						<ListGroup.Item>
							<h2 className='text-uppercase'>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								item
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn btn-lg btn-block btn-dark'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
