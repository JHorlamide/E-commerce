import axios from 'axios';

const url = '/api/orders';

export const getOrders = (token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(url, config);
};

/* Create Order Reducer */
export const createOrder = (orderData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.post(url, orderData, config);
};

/* Order  Details*/
export const getOrderDetails = (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`${url}/${id}`, config);
};

/* Pay Order */
export const payOrder = (orderId, token, paymentResult) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.put(`${url}/${orderId}/pay`, paymentResult, config);
};

/* Deliver Order */
export const orderDelivered = (orderId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.put(`${url}/${orderId}/delivered`, {}, config);
};

/* User Order*/
export const getUserOrder = (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`${url}/myorders`, config);
};
