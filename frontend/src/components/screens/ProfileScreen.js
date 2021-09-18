import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alertAction';
import { getUserProfile, updateUserProfile } from '../../actions/userAction';
import { getUserOrder } from '../../actions/orderAction';
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstant'

/* Custom Component */
import Loader from '../layouts/Loader';

/* React Bootstrap Components*/
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /* Get user and loading from state */
  const { loading, user } = useSelector((state) => state.userProfile);

  /* Get userInfo from state */
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  /* Get user order from state */
  const userOrder = useSelector((state) => state.userOrder);
  const { loading: loadingOrders, orders } = userOrder;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserProfile());
      dispatch(getUserOrder());
    } else {
      setName(user && user.name);
      setEmail(user && user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return dispatch(setAlert('Passwords do not match', 'info'));
    } else {
      dispatch(updateUserProfile({ _id: user && user._id, name, email, password }));
      dispatch(setAlert('Profile updated', 'success'));
    }
  };

  return (
    <Row>
      {/* Profile */}
      <Col md={3}>
        <h1>Update Profile</h1>
        {loading && <Loader />}
        <Form onSubmit={(e) => handleSubmit(e)}>
          {/* Name */}
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={name && name}
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Email */}
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email && email}
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Password */}
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password && password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3'>
            Update
          </Button>
        </Form>
      </Col>

      {/* Orders */}
      <Col md={9}>
        <h2>My Orders</h2>

        {/* Orders List */}
        {loadingOrders ? (
          <Loader />
        ) : (
          <Table className='table-sm' striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => {
                  return (
                    <tr key={order && order._id}>
                      <td>{order && order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order && order._id}`}>
                          <Button className='btn-sm' variant>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
