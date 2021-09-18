import mongoose from 'mongoose';
import Joi from 'joi';

/* Review Schema */
const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		name: {
			type: String,
			required: true,
		},

		rating: {
			type: Number,
			required: true,
		},

		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

/* Product Schema */
const productSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},

	name: {
		type: String,
		required: true,
	},

	image: {
		type: String,
		required: true,
	},

	brand: {
		type: String,
		required: true,
	},

	category: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
		default: 0,
	},

	reviews: [reviewSchema],

	rating: {
		type: Number,
		required: true,
		default: 0,
	},

	numberInStock: {
		type: Number,
		required: true,
		default: 0,
	},

	numReviews: {
		type: Number,
		required: true,
		default: 0,
	},
});

/* product validation */
export const productValidation = (product) => {
	const schema = Joi.object({
		_id: Joi.required(),
		name: Joi.string().min(5).max(255).required(),
		image: Joi.string().min(5).max(255).required(),
		description: Joi.string().min(5).max(400).required(),
		numberInStock: Joi.number(),
		numReviews: Joi.number(),
		category: Joi.string().required(),
		brand: Joi.string().required(),
		price: Joi.number().required(),
	});

	return schema.validate(product);
};

/* product validation */
export const validateReview = (review) => {
	const schema = Joi.object({
		rating: Joi.number().required(),
		comment: Joi.string().required(),
	});

	return schema.validate(review);
};

export const Product = mongoose.model('Product', productSchema);
