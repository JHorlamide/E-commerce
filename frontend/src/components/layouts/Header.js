import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../../actions/userAction';
import SearchBox from './SearchBox';

const Header = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userLogin.userInfo);

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					{/* Home page */}
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Route render={({ history }) => <SearchBox history={history} />} />
						<Nav
							className='ml-auto justify-content-end'
							style={{ width: '100%' }}
						>
							{/* Cart */}
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>

							{/* Login user */}
							{userInfo ? (
								<NavDropdown
									title={userInfo ? userInfo.name : ''}
									id='username'
								>
									<LinkContainer to='/profile/'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminMenu'>
									{/* Admin User List */}
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>

									{/* Admin Product List */}
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>

									{/* Admin Order List */}
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
