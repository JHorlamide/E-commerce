import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../../actions/cartAction';

/* Custom Component */
import FormContainer from '../../components/form_component/FormComponent';
import CheckoutSteps from '../../components/layouts/CheckOutSteps';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  /* Check to see if there is shipping details */
  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      {/* Check out steps */}
      <CheckoutSteps step1 step2 step3 />

      <h1 className='text-uppercase'>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          {/* PayPal */}
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              value='PayPal'
              name='paymentMethod'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>

          {/* Strip */}
          <Col>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              value='Stripe'
              name='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' className='btn btn-dark my-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
