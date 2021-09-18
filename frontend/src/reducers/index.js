import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { alertReducer } from './alertReducer';

// Reducers
import {
	productListReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productCreateReviewReducer,
	topRatedProductReducer,
} from './productReducer';

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderDeliveredReducer,
	orderPayReducer,
	userOrderReducer,
	orderListReducer,
} from './orderReducer';

import {
	userRegisterReducer,
	userLoginReducer,
	logoutUserReducer,
	userProfileReducer,
	userListReducer,
	userUpdateProfileReducer,
	userDeleteReducer,
	adminUserUpdateReducer,
	userDetailsReducer,
} from './userReducer';

export default combineReducers({
	/* Products */
	productList: productListReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	topRatedProducts: topRatedProductReducer,

	/* User */
	userLogin: userLoginReducer,
	userLogout: logoutUserReducer,
	userProfile: userProfileReducer,
	userList: userListReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,

	/* Admin Only */
	userDelete: userDeleteReducer,
	adminUserUpdate: adminUserUpdateReducer,
	userDetails: userDetailsReducer,

	/* Orders */
	orderList: orderListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDelivered: orderDeliveredReducer,
	userOrder: userOrderReducer,
	
	/* Alert */
	alert: alertReducer,

	/* Cart */
	cart: cartReducer,
});
