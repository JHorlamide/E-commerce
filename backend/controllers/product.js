import asyncMiddleware from '../middlewares/async.js';
import {
	Product,
	productValidation,
	validateReview,
} from '../models/Product.js';

/***
 * @router  POST: api/products
 * @desc    Create new product
 * @access  Private | Admin user only
 * ***/
export const createProduct = asyncMiddleware(async (req, res) => {
	const { error } = productValidation(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const product = new Product({ user: req.user._id, ...req.body });

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

/***
 * @router  GET: api/products
 * @desc    Get all products
 * @access  Public
 * ***/
export const getProducts = asyncMiddleware(async (req, res) => {
	const pageSize = 10;
	const pageNumber = Number(req.query.pageNumber) || 1;

	/* Search functionality */
	const searchKeyWord = req.query.searchKeyWord
		? {
				name: {
					$regex: req.query.searchKeyWord,
					$options: 'i',
				},
		  }
		: {};

	/* Pagination */
	const productCount = await Product.countDocuments({
		...searchKeyWord,
	});
	const pages = Math.ceil(productCount / pageSize);

	const products = await Product.find({ ...searchKeyWord })
		.limit(pageSize)
		.skip(pageSize * (pageNumber - 1));

	res.json({ products, pageNumber, pages });
});

/***
 * @router  GET: api/products/:id
 * @desc    Get single product by Id
 * @access  Public
 * ***/
export const getProductById = asyncMiddleware(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	res.json(product);
});

/***
 * @router  PUT: api/products/:id
 * @desc    Update product
 * @access  Private | Admin user only
 * ***/
export const updateProduct = asyncMiddleware(async (req, res) => {
	const product = await Product.findById(req.params.id);

	const { error } = productValidation(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	if (product) {
		product._id = req.body._id;
		product.name = req.body.name;
		product.image = req.body.image;
		product.price = req.body.price;
		product.description = req.body.description;
		product.category = req.body.category;
		product.brand = req.body.brand;
		product.numberInStock = req.body.numberInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

/***
 * @router  DELETE: api/products/:id
 * @desc    Delete product
 * @access  Private | Admin user only
 * ***/
export const deleteProductAdmin = asyncMiddleware(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed successfully' });
	} else {
		res.status(404);
		throw new Error(`Product not found`);
	}
});

/***
 * @router  POST: api/products/:id/reviews
 * @desc    Create product review
 * @access  Private
 * ***/
export const createProductReview = asyncMiddleware(async (req, res) => {
	const product = await Product.findById(req.params.id);

	const { error } = validateReview(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() == req.user._id.toString()
		);

		if (alreadyReviewed) {
			return res.status(400).json({ message: 'Product already reviewed' });
		}

		product.reviews.push({
			user: req.user._id,
			name: req.user.name,
			rating: Number(req.body.rating),
			comment: req.body.comment,
		});

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ msg: 'Review added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

/***
 * @router  GET: api/products/top
 * @desc    Get top rated product
 * @access  Public
 * ***/
export const getTopRatedProducts = asyncMiddleware(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	res.json(products);
});
