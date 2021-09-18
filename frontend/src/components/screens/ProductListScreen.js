import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { getProducts, deleteProduct } from '../../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstant';
import axios from 'axios';

/* Custom Component */
import Loader from '../layouts/Loader';
import Paginate from '../layouts/Paginate';

const ProductListScreen = ({ history, match }) => {
	const pageNum = match.params.pageNumber;

	const dispatch = useDispatch();

	/* Get product from productList state */
	const productList = useSelector((state) => state.productList);
	const { loading, products, pages, pageNumber } = productList;

	/* productDelete state */
	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete } = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		success: successCreate,
		loading: loadingCreate,
		product: createdProduct,
	} = productCreate;

	/* Get users from userList state */
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/login');
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			const source = axios.CancelToken.source();

			dispatch(getProducts(source, '', pageNum));

			return () => {
				source.cancel('Request Cancelled.');
			};
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		createdProduct,
		successCreate,
    pageNum
	]);

	const createProductHandler = () => {
		history.push('/admin/create-product');
	};

	const handleProductDelete = (productId) => {
		if (window.confirm('Are you sure you want to DELETE this product?')) {
			dispatch(deleteProduct(productId));
		}
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h2>Products</h2>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>

			{loadingDelete && <Loader />}

			{loadingCreate && <Loader />}

			{loading ? (
				<Loader />
			) : (
				<>
					<Table className='table-sm' striped responsive bordered hover>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => {
								return (
									<tr key={product._id}>
										<td className='text-uppercase'>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<LinkContainer to={`/admin/product/${product._id}/edit`}>
												<Button className='btn-sm' variant='light'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>

											{/* Delete Product */}
											<Button
												variant='danger'
												className='btn-sm'
												onClick={(e) => handleProductDelete(product._id)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Paginate pages={pages} pageNumber={pageNumber} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
