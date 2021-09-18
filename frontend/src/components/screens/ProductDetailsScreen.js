import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	getProduct,
	createProductReview,
	productReviewReset,
} from '../../actions/productAction';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
	Alert,
} from 'react-bootstrap';

/* Custom Component */
import Rating from '../../components/product/ProductRating';
import Loader from '../../components/layouts/Loader';
import Meta from '../../components/layouts/Meta';

const ProductScreen = ({ history, match }) => {
	const productId = match.params.id;
	const dispatch = useDispatch();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const { product, loading } = useSelector((state) => state.productList);

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const { success: successProductReview, error: productReviewError } =
		productCreateReview;

	useEffect(() => {
		if (successProductReview) {
			<Alert variant='primary'>Review Submitted</Alert>;
			setRating(0);
			setComment('');
			dispatch(productReviewReset());
		}
		const source = axios.CancelToken.source();
		dispatch(getProduct(productId, source));

		return () => {
			return source.cancel('Request canceled');
		};
	}, [dispatch, productId, successProductReview]);

	/* addToCart Function */
	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}/?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(createProductReview(productId, { rating, comment }));
	};

	return (
		<Fragment>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>

			{loading ? (
				<Loader />
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						{/* Image */}
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>

						{/* Content */}
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item variant='flush'>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product && product.rating ? product.rating : 0}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>

						{/* Testing */}
						<Col md={3}>
							<Card>
								<ListGroup>
									{/* Price */}
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									{/* Status */}
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.numberInStock > 0
													? 'In stock'
													: 'Out of stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{/* Quantity */}
									{product.numberInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.numberInStock).keys()].map(
															(key) => (
																<option
																	className='dropdown-item'
																	key={key + 1}
																	value={key + 1}
																>
																	{key + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									{/* AddToCart */}
									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn-block btn-dark'
											type='button'
											disabled={product.numberInStock === 0}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>

					{/* Review */}
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && (
								<Alert variant='primary'>No Reviews</Alert>
							)}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => {
									return (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating
												value={review.rating}
												text={`${product.numReviews} reviews`}
											/>
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									);
								})}

								{/* Add reviews */}
								<ListGroup.Item>
									<h2>Write a customer review</h2>
									{productReviewError && (
										<Alert variant='danger'>{productReviewError}</Alert>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											{/* Rating */}
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>

											{/* Comment */}
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>

											{/* Button */}
											<Button className='my-3' type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Alert>
											Please <Link to='/login'>sign in</Link> to write a review
										</Alert>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</Fragment>
	);
};

export default ProductScreen;
