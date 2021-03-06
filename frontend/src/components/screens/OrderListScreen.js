import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { getOrders } from '../../actions/orderAction';

/* Custom Component */
import Loader from '../layouts/Loader';

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	/* Get orders from orderList state */
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders } = orderList;

	/* Get users from userList state */
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getOrders());
		} else {
			history.push('/');
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h2>Orders</h2>
			{loading ? (
				<Loader />
			) : (
				<Table className='table-sm' striped responsive bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							return (
								<tr key={order._id}>
									<td className='text-uppercase'>{order._id}</td>
									<td>{order.user && order.user.name}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>${order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>

									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant='light'>
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
		</>
	);
};

export default OrderListScreen;
