import express from 'express';
import { auth, admin } from '../middlewares/auth.js';

const router = express.Router();

/* Controllers */
import {
	getProducts,
	getProductById,
	deleteProductAdmin,
	createProduct,
	updateProduct,
	createProductReview,
	getTopRatedProducts,
} from '../controllers/product.js';

/***
 * @router  get: api/products/top
 * @desc    Get top rated products.
 * ***/
router.get('/top', getTopRatedProducts);

/***
 * @router  POST: api/products/:id/reviews
 * @desc    Create product review
 * ***/
router.route('/:id/reviews').post(auth, createProductReview);

/***
 * @router  GET | POST: api/products
 * @desc    Get all products | Create new product.
 * ***/
router.route('/').get(getProducts).post([auth, admin], createProduct);

/***
 * @router  GET | DELETE | PUT: api/products/:id
 * @desc    Get product by id | Delete product. | Update product
 * ***/
router
	.route('/:id')
	.get(getProductById)
	.delete([auth, admin], deleteProductAdmin)
	.put([auth, admin], updateProduct);

export default router;
