import React from 'react';
import './CommonStyle.css';

const ProductItem = ({ product, onClick }) => {
    
  return (
    <div className="product-item" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.title} loading="lazy" style={{ maxWidth: '200px', maxHeight: '200px'}} />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
      {product.rating && (
        <p className="rating">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
      )}
    </div>
  );
};

export default ProductItem;
