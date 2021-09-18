import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../actions/productAction';

/* Custom Component */
import Products from '../product/Product';
import ProductCarousel from '../layouts/ProductCarousel';
import Loader from '../../components/layouts/Loader';
import Paginate from '../layouts/Paginate';
import Meta from '../layouts/Meta';

const HomeScreen = ({ match }) => {
	const searchKeyWord = match.params.searchKeyWord;

	const pageNum = match.params.pageNumber;

	const dispatch = useDispatch();

	const { products, loading, error, pages, pageNumber } = useSelector(
		(state) => state.productList
	);

	useEffect(() => {
		const source = axios.CancelToken.source();

		dispatch(getProducts(source, searchKeyWord, pageNum));

		return () => {
			return source.cancel('Request canceled');
		};
	}, [dispatch, searchKeyWord, pageNum]);

	return (
		<Fragment>
			<Meta />
			{!searchKeyWord ? (
				<ProductCarousel />
			) : (
				<Link className='btn btn-light' to=''>
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading && error ? (
				<Loader />
			) : (
				<>
					<Row>
						{products.map((product) => {
							return (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Products product={product} />
								</Col>
							);
						})}
					</Row>
					<Paginate
						pages={pages}
						pageNumber={pageNumber}
						searchKeyWord={searchKeyWord}
					/>
				</>
			)}
		</Fragment>
	);
};

export default HomeScreen;
