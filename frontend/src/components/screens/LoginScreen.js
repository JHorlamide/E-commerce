import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/userAction';

/* Custom Component */
import FormComponent from '../form_component/FormComponent';
import Loader from '../layouts/Loader';

/* React Bootstrap Components*/
import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { loading, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  return (
    <FormComponent>
      <h1>Sign In</h1>
      {loading && <Loader />}
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* Email */}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            placeholder='Enter Email'
            onChange={(e) => onChange(e)}
          ></Form.Control>
        </Form.Group>

        {/* Password */}
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            placeholder='Enter Password'
            onChange={(e) => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New customer ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormComponent>
  );
};

export default LoginScreen;
