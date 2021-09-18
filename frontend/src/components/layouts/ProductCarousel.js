import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { getTopRatedProducts } from '../../actions/productAction';

/* Custom Component */
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const topRatedProducts = useSelector((state) => state.topRatedProducts);
	console.log('top product: ', topRatedProducts);
	const { loading, error, products } = topRatedProducts;

	useEffect(() => {
		const source = axios.CancelToken.source();
		dispatch(getTopRatedProducts(source));

		return () => {
			return source.cancel('Request canceled');
		};
	}, [dispatch]);
	return loading ? (
		<Loader />
	) : error ? (
		<Message alertType='danger' errorMessage={error} />
	) : (
		<Carousel className='bg-dark' pause='hover'>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
