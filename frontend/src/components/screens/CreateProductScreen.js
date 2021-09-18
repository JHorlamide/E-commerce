import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alertAction';
import { createProduct } from '../../actions/productAction';
import FormComponent from '../form_component/FormComponent';

/* React Bootstrap Components*/
import { Button, Col, Form, Row } from 'react-bootstrap';

const CreateProductScreen = ({ history }) => {
	const dispatch = useDispatch();
	const [productData, setProductData] = useState({
		name: '',
		image: '',
		price: '',
		category: '',
		brand: '',
		numberInStock: '',
		description: '',
	});

	const { name, price, image, category, brand, description, numberInStock } =
		productData;

	const productCreate = useSelector((state) => state.productCreate);
	const { success: successCreate, product } = productCreate;

	/* Get users from userList state */
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (userInfo.isAdmin) {
			dispatch(createProduct(productData));

			setAlert('Product created successfully', 'success');

			if (successCreate) {
				history.push(`/admin/product/${product._id}/edit`);
			}
		} else {
			history.push('/login');
		}
	};

	const onChange = (e) => {
		setProductData({
			...productData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			{/* Back to prevPage */}
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>

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
									onChange={(e) => onChange(e)}
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
									onChange={(e) => onChange(e)}
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
							onChange={(e) => onChange(e)}
						></Form.Control>
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
									onChange={(e) => onChange(e)}
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
									onChange={(e) => onChange(e)}
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
							onChange={(e) => onChange(e)}
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
							onChange={(e) => onChange(e)}
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

export default CreateProductScreen;
