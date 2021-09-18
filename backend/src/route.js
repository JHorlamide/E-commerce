import express from 'express';
import path from 'path';

/* Routes */
import userRoute from '../routes/user.js';
import productRoute from '../routes/product.js';
import authRoute from '../routes/auth.js';
import orderRoute from '../routes/order.js';
import fileUploads from '../routes/uploadRoutes.js';

/* Middleware */
import {
	objectIdErrorHandler,
	errorHandler,
	notFound,
} from '../middlewares/error_handler.js';

const route = (app) => {
	app.use(express.json());

	app.use('/api/products', productRoute);
	app.use('/api/users', userRoute);
	app.use('/api/auth', authRoute);
	app.use('/api/orders', orderRoute);
	app.use('/api/uploads', fileUploads);

	/* Send PayPal clientId to Client */
	app.get('/api/config/paypal', (req, res) =>
		res.send(process.env.PAYPAL_CLIENT_ID)
	);

	/* File upload config */
	const __dirname = path.resolve();
	app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

	/* App deployment config */
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../frontend/build')));

		app.use('*', (req, res) => {
			return res.sendFile(
				path.resolve(__dirname, '../frontend', 'build', 'index.html')
			);
		});
	} else {
		app.get('/', (req, res) => {
			res.send('API running...');
		});
	}

	/* Error handling */
	app.use(notFound);
	app.use(errorHandler);
	app.use(objectIdErrorHandler);
};

export default route;
