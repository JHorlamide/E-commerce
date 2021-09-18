import axios from 'axios';

const url = '/api/products';

/***
 * @router  POST: /api/products
 * @desc    Create new product
 * @access  Private
 * ***/
export const createProduct = (productData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.post(url, productData, config);
};

/***
 * @router  POST: /api/products/:id/reviews
 * @desc    Create product reviews
 * @access  Private
 * ***/
export const createProductReview = (productId, reviewData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.post(`${url}/${productId}/reviews`, reviewData, config);
};

/***
 * @router  GET: /api/products/top
 * @desc   	Get top rated product
 * @access  Public
 * ***/
export const getTopRatedProduct = (source) => {
	try {
		return axios.get(`${url}/top`, {
			cancelToken: source.token,
		});
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log(`Error from api ${error.message}`);
		}
		return error;
	}
};

/***
 * @router  GET: /api/products
 * @desc    Get all products
 * @access  Public
 * ***/
export const getProducts = (source, searchKeyWord, pageNumber) => {
	try {
		return axios.get(
			`${url}?searchKeyWord=${searchKeyWord}&pageNumber=${pageNumber}`,
			{
				cancelToken: source.token,
			}
		);
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log(`Error from api ${error.message}`);
		}
		return error;
	}
};

/***
 * @router  GET: api/product/:id
 * @desc    Get single product
 * @access  Public
 * ***/
export const getProduct = (productId, source) => {
	try {
		return axios.get(`${url}/${productId}`, {
			cancelToken: source.token,
		});
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log(`Error from api${error.message}`);
		}
		return error;
	}
};

/***
 * @router  DELETE: api/product/:id
 * @desc    Get single product
 * @access  Private | Admin Users Only
 * ***/
export const deleteProduct = (productId, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.delete(`${url}/${productId}`, config);
};

/***
 * @router  PUT: api/product/:id
 * @desc    Get single product
 * @access  Private | Admin Users Only
 * ***/
export const updateProduct = (productData, productId, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.put(`${url}/${productId}`, productData, config);
};
