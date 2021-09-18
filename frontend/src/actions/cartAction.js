import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstant';

export const addToCart = (id, qty, source) => {
	return async (dispatch, getState) => {
		try {
			const { data } = await axios.get(`/api/products/${id}`, {
				cancelToken: source.token,
			});

			console.log('From cart action', data);

			dispatch({
				type: CART_ADD_ITEM,
				payload: {
					product: data._id,
					name: data.name,
					image: data.image,
					price: data.price,
					numberInStock: data.numberInStock,
					qty,
				},
			});

			/* store cart item in localStorage */
			localStorage.setItem(
				'cartItems',
				JSON.stringify(getState().cart.cartItems)
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const removeFromCart = (id) => {
	return (dispatch, getState) => {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: {
				product: id,
			},
		});

		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	};
};

export const saveShippingAddress = (data) => {
	return (dispatch) => {
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS,
			payload: data,
		});

		localStorage.setItem('shippingAddress', JSON.stringify(data));
	};
};

export const savePaymentMethod = (data) => {
	return (dispatch) => {
		dispatch({
			type: CART_SAVE_PAYMENT_METHOD,
			payload: data,
		});

		localStorage.setItem('paymentMethod', JSON.stringify(data));
	};
};
