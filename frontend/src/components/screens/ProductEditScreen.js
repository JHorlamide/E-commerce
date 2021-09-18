import axios from 'axios';
import React, { useEffect, useState } from 'react';
/* React Bootstrap Components*/
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, updateProduct } from '../../actions/productAction';
import FormComponent from '../form_component/FormComponent';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstant';
/* Custom Component */
import Loader from '../layouts/Loader';

const ProductEditScreen = ({ history, match }) => {
	const productId = match.params.id;
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState('');
	const [brand, setBrand] = useState('');
	const [numberInStock, setNumberInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);

	const productList = useSelector((state) => state.productList);
	const { product } = productList;

	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, success: successUpdate } = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		}

		if (!product.name || product._id !== productId) {
			const source = axios.CancelToken.source();
			dispatch(getProduct(productId, source));

			return () => {
				return source.cancel('Request canceled');
			};
			
		} else {
			setName(product.name);
			setImage(product.image);
			setPrice(product.price);
			setCategory(product.category);
			setBrand(product.brand);
			setNumberInStock(product.numberInStock);
			setDescription(product.description);
		}
	}, [dispatch, product, productId, successUpdate, history]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				header: {
					'Content-Type': 'multipart/form-data'
				}
			}

			const { data } = await axios.post('/api/uploads', formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct(
				{
					_id: productId,
					name,
					image,
					price,
					category,
					brand,
					description,
					numberInStock,
				},
				productId
			)
		);
	};

	return (
		<>
			{/* Back to prevPage */}
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loadingUpdate && <Loader />}
			<FormComponent>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Row>
						<Col>
							{/* Product Name */}
							<Form.Group controlId='name'>
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									type='text'
									name='name'
									value={name}
									placeholder='Enter product name'
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>

						<Col>
							{/* Product Price */}
							<Form.Group controlId='price'>
								<Form.Label>Price</Form.Label>
								<Form.Control
									type='number'
									name='price'
									value={price}
									placeholder='Enter product price'
									onChange={(e) => setPrice(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>

					{/* Product Image */}
					<Form.Group controlId='image'>
						<Form.Label>Product Image</Form.Label>
						<Form.Control
							type='text'
							name='image'
							value={image}
							placeholder='Image'
							onChange={(e) => setImage(e.target.value)}
						>
						</Form.Control>

						{/* Choose image */}
						<Form.File
							id='image-file'
							label='Choose file'
							custom
							onChange={uploadFileHandler}
						></Form.File>
						{uploading && <Loader />}
					</Form.Group>

					<Row>
						<Col>
							{/* Product Category */}
							<Form.Group controlId='category'>
								<Form.Label>category</Form.Label>
								<Form.Control
									type='text'
									name='category'
									value={category}
									placeholder='Product category'
									onChange={(e) => setCategory(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>

						<Col>
							{/* Product Brand*/}
							<Form.Group controlId='brand'>
								<Form.Label>Brand</Form.Label>
								<Form.Control
									type='text'
									name='brand'
									value={brand}
									placeholder='Enter product brand'
									onChange={(e) => setBrand(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>

					{/* Number In stock */}
					<Form.Group controlId='numberInStock'>
						<Form.Label>Number In Stock</Form.Label>
						<Form.Control
							type='number'
							name='numberInStock'
							value={numberInStock}
							placeholder='Number in stock'
							onChange={(e) => setNumberInStock(e.target.value)}
						></Form.Control>
					</Form.Group>

					{/* Description */}
					<Form.Group controlId='description'>
						<Form.Label>Product Description</Form.Label>
						<Form.Control
							type='text'
							name='description'
							value={description}
							placeholder='Enter product description'
							onChange={(e) => setDescription(e.target.value)}
							as='textarea'
							rows={3}
						/>
					</Form.Group>

					<Button type='submit' variant='primary' className='my-3'>
						Create
					</Button>
				</Form>
			</FormComponent>
		</>
	);
};

export default ProductEditScreen;
