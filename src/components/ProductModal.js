import React from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './CommonStyle.css';

const ProductModal = ({ product, onClose }) => {
  return (
    <PureModal
      header={product?.title}
      isOpen={!!product}
      closeButton={<span style={{ fontSize: '20px', fontWeight: 'bold', color:"black" }}>X</span>}
      closeButtonPosition="header"
      width="500px"
      onClose={() => {
        onClose();
        return true;
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src={product?.image}
          alt={product?.title}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '10px' }}
        />
        <p className='description'>{product?.description}</p>
        <p><strong>Category:</strong> {product?.category}</p>
        <p><strong>Price:</strong> ${product?.price}</p>
        <p><strong>Rating:</strong> {product?.rating?.rate}⭐</p>
      </div>
    </PureModal>
  );
};

export default ProductModal;
