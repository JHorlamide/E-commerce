import {
	GET_ORDERS_FAIL,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_REQUEST,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
	ORDER_USER_FAIL,
	ORDER_USER_REQUEST,
	ORDER_USER_RESET,
	ORDER_USER_SUCCESS,
	ORDER_DELIVERED_REQUEST,
	ORDER_DELIVERED_SUCCESS,
	ORDER_DELIVERED_FAIL,
	ORDER_DELIVERED_RESET,
} from '../constants/orderConstant';

/*  Order Reducers */
export const orderListReducer = (state = { orders: [] }, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ORDERS_REQUEST:
			return { loading: true };
		case GET_ORDERS_SUCCESS:
			return { orders: payload, loading: false };
		case GET_ORDERS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

/* Create Order */
export const orderCreateReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: payload };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

/* Order details */
export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: payload };
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: payload };
		default:
			return state;
	}
};

/* Order Pay */
export const orderPayReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };
		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true };
		case ORDER_PAY_FAIL:
			return { loading: false, error: payload };
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

/* Order Delivered */
export const orderDeliveredReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case ORDER_DELIVERED_REQUEST:
			return { loading: true };
		case ORDER_DELIVERED_SUCCESS:
			return { loading: false, success: true };
		case ORDER_DELIVERED_FAIL:
			return { loading: false, error: payload };
		case ORDER_DELIVERED_RESET:
			return {};
		default:
			return state;
	}
};

/* Order details */
export const userOrderReducer = (state = { orders: [] }, action) => {
	const { type, payload } = action;

	switch (type) {
		case ORDER_USER_REQUEST:
			return { ...state, loading: true };
		case ORDER_USER_SUCCESS:
			return { loading: false, orders: payload };
		case ORDER_USER_FAIL:
			return { loading: false, error: payload };
		case ORDER_USER_RESET:
			return { orders: [] };
		default:
			return state;
	}
};
