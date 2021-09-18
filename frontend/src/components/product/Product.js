import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Custom Components */
import Rating from './ProductRating';

const Products = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      {/* Product Name */}
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className='text-decoration-none text-dark'
        >
          <Card.Title as='div' className='text-decoration-none'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Rating & Reviews */}
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        {/* Price */}
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
