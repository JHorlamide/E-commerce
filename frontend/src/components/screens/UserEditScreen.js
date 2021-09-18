import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { setAlert } from '../../actions/alertAction';
import {
	getUserDetails,
	adminUpdateUser,
	adminUserUpdateReset,
} from '../../actions/userAction';

/* React Bootstrap Components*/
import { Form, Button } from 'react-bootstrap';

/* Custom Component */
import FormContainer from '../form_component/FormComponent';
import Loader from '../layouts/Loader';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user } = userDetails;

	const adminUserUpdate = useSelector((state) => state.adminUserUpdate);
	const { loading: loadingUpdate, success: successUpdate } = adminUserUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch(adminUserUpdateReset());
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, userId, user, history, successUpdate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(adminUpdateUser({ _id: user._id, name, email, isAdmin }));
	};

	return (
		<>
			{/* Back to prevPage */}
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{loading ? (
					<Loader />
				) : (
					<Form onSubmit={handleSubmit}>
						{/* name */}
						<Form.Group controlId='email'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								name='name'
								value={name}
								placeholder='Enter Name'
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						{/* Email */}
						<Form.Group controlId='email' className='my-3'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								name='email'
								value={email}
								placeholder='Enter Email'
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						{/* isAdmin */}
						<Form.Group controlId='isAdmin' className='my-3'>
							<Form.Check
								type='checkbox'
								name='isAdmin'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button
							type='submit'
							variant='primary'
							className='btn-dark my-3'
						>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
