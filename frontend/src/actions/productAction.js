import * as api from '../api/productApi';
import { setAlert } from './alertAction';
import {
	GET_PRODUCTS,
	GET_PRODUCT,
	PRODUCT_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAILED,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAILED,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAILED,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILED,
	PRODUCT_CREATE_REVIEW_RESET,
	TOP_RATED_PRODUCT_REQUEST,
	TOP_RATED_PRODUCT_SUCCESS,
	TOP_RATED_PRODUCT_FAILED,
} from '../constants/productConstant';

/* Get all products */
export const getProducts = (source, searchKeyWord = '', pageNumber = '') => {
	return async (dispatch) => {
		try {
			const { data } = await api.getProducts(source, searchKeyWord, pageNumber);
			dispatch({
				type: GET_PRODUCTS,
				payload: data,
			});
		} catch (error) {
			if (error.response && error.response.data.message) {
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: PRODUCT_FAIL,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};

/* Get top rated product */
export const getTopRatedProducts = (source) => {
	return async (dispatch) => {
		try {
			dispatch({ type: TOP_RATED_PRODUCT_REQUEST });

			const { data } = await api.getTopRatedProduct(source);
			dispatch({ type: TOP_RATED_PRODUCT_SUCCESS, payload: data });
		} catch (error) {
			if (error.response && error.response.data.message) {
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: TOP_RATED_PRODUCT_FAILED,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};

/* Get single product */
export const getProduct = (productId, source) => {
	return async (dispatch) => {
		try {
			const { data } = await api.getProduct(productId, source);

			dispatch({
				type: GET_PRODUCT,
				payload: data,
			});
		} catch (error) {
			if (error.response && error.response.data.message) {
				console.log('Error from product action:', error.response);
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: PRODUCT_FAIL,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};

/* Delete product | Admin User Only */
export const deleteProduct = (productId) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_DELETE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const { data } = await api.deleteProduct(productId, userInfo.token);

			dispatch({ type: PRODUCT_DELETE_SUCCESS });

			dispatch(setAlert(data.message, 'success'));
		} catch (error) {
			if (error.response && error.response.data.message) {
				console.log('Error from product action:', error.response);
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: PRODUCT_DELETE_FAILED,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};

export const createProduct = (productDate) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_CREATE_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();

			const { data } = await api.createProduct(productDate, userInfo.token);

			dispatch({ type: PRODUCT_CREATE_SUCCESS, product: data });
		} catch (error) {
			if (error.response && error.response.data.message) {
				console.log('Error from product action:', error.response);
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: PRODUCT_CREATE_FAILED,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};

/* Create Product Review */
export const createProductReview = (productId, reviewDate) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			await api.createProductReview(productId, reviewDate, userInfo.token);

			dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
		} catch (error) {
			if (error.response && error.response.data.message) {
				console.log('Error from product action:', error.response);
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: PRODUCT_CREATE_REVIEW_FAILED,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};

/* Create product review reset */
export const productReviewReset = () => {
	return async (dispatch) =>
		dispatch({
			type: PRODUCT_CREATE_REVIEW_RESET,
		});
};

/* Update product | Admin User Only */
export const updateProduct = (productData, productId) => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_UPDATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			await api.updateProduct(productData, productId, userInfo.token);

			dispatch({ type: PRODUCT_UPDATE_SUCCESS });

			dispatch(setAlert('Product Updated successfully', 'success'));
		} catch (error) {
			if (error.response && error.response.data.message) {
				dispatch(setAlert(error.response.data.message, 'danger'));
				dispatch({
					type: PRODUCT_UPDATE_FAILED,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		}
	};
};
