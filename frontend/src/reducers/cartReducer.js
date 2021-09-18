import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from '../constants/cartConstant';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find((cartItem) => {
        return cartItem.product === item.product;
      });

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            return cartItem.product === existItem.product ? item : cartItem;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.product !== payload.product;
        }),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    case CART_RESET:
      return {...state, cartItems: [] };

    default:
      return state;
  }
};
