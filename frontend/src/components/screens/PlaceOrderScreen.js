import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import { createOrder } from '../../actions/orderAction';

/* Custom Component */
import CheckOutSteps from '../layouts/CheckOutSteps';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  /* Calculate Prices */
  const addDecimal = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimal(
    cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );

  /* Shipping Price Calculation */
  cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 100);

  /* Tax Price Calculation */
  cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));

  /* Total Price Calculation */
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }

    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice: cart.totalPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        itemsPrice: cart.itemsPrice,
      })
    );
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        {/* Item Details */}
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* Shipping Address */}
            <ListGroup.Item>
              <h2 className='text-uppercase'>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}.
              </p>
            </ListGroup.Item>

            {/* Payment Method */}
            <ListGroup.Item>
              <h2 className='text-uppercase'>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2 className='text-uppercase'>Order Items</h2>
              {cartItems.length === 0 ? (
                <h2>Your cart is empty</h2>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          {/* Item Image */}
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          {/* Item Name */}
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>

                          {/* Item Quantity & Price*/}
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Item Price Details */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              {/* Item Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Items Price:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Shipping Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Tax Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Total Price */}
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Place order Button*/}
              <ListGroup>
                <Button
                  type='button'
                  className='btn-block btn-dark'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
