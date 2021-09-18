/* Custom Component */
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Message from './components/layouts/Message';
import HomeScreen from './components/screens/HomeScreen';
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import OrderScreen from './components/screens/OrderScreen';
import OrderListScreen from './components/screens/OrderListScreen';
import UserListScreen from './components/screens/UserListScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import UserEditScreen from './components/screens/UserEditScreen';
import CreateProductScreen from './components/screens/CreateProductScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';
import ProductScreen from './components/screens/ProductDetailsScreen';

/* React Bootstrap */
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Message />
					<Route exact path='/login' component={LoginScreen} />
					<Route exact path='/register' component={RegisterScreen} />
					<Route exact path='/profile' component={ProfileScreen} />
					<Route exact path='/product/:id' component={ProductScreen} />
					<Route exact path='/cart/:id?' component={CartScreen} />
					<Route exact path='/shipping' component={ShippingScreen} />
					<Route exact path='/payment' component={PaymentScreen} />
					<Route exact path='/placeorder' component={PlaceOrderScreen} />
					<Route exact path='/order/:id' component={OrderScreen} />
					<Route exact path='/admin/orderlist' component={OrderListScreen} />
					<Route exact path='/admin/userlist' component={UserListScreen} />
					<Route
						exact
						path='/admin/create-product'
						component={CreateProductScreen}
					/>
					<Route
						exact
						path='/admin/productlist'
						component={ProductListScreen}
					/>
					<Route
						exact
						path='/admin/productlist/:pageNumber'
						component={ProductListScreen}
					/>
					<Route exact path='/admin/user/:id/edit' component={UserEditScreen} />
					<Route
						exact
						path='/admin/product/:id/edit'
						component={ProductEditScreen}
					/>
					<Route exact path='/' component={HomeScreen} />
					<Route exact path='/page/:pageNumber' component={HomeScreen} />
					<Route
						exact
						path='/search/:searchKeyWord/page/:pageNumber'
						component={HomeScreen}
					/>
					<Route exact path='/search/:searchKeyWord' component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
