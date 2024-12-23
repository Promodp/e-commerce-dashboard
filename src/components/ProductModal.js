import React from 'react';
import './CommonStyle.css';

const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{product?.title}</h3>
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <img
            src={product?.image}
            alt={product?.title}
            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '10px' }}
          />
          <p className="description">{product?.description}</p>
          <p><strong>Category:</strong> {product?.category}</p>
          <p><strong>Price:</strong> ${product?.price}</p>
          <p><strong>Rating:</strong> {product?.rating?.rate} ⭐</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
