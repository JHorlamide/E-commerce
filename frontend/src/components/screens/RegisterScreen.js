import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alertAction';
import { register } from '../../actions/userAction';

/* React Bootstrap Components*/
import { Form, Button, Row, Col } from 'react-bootstrap';

/* Custom Component */
import FormContainer from '../form_component/FormComponent';
import Loader from '../layouts/Loader';



const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = registerData;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { loading, userInfo } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return dispatch(setAlert('Passwords do not match', 'info'));
    } else {
      return dispatch(register({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        {/* name */}
        <Form.Group controlId='email'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={name}
            placeholder='Enter Name'
            onChange={(e) => onChange(e)}
          ></Form.Control>
        </Form.Group>

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

        {/* Confirm Password */}
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Enter Password'
            onChange={(e) => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account ?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
