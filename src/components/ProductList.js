import React, { useState, Suspense } from 'react';
import ProductItem from './ProductItem';
import Filters from './Filters';
import useFetchProducts from '../hooks/useFetchProducts';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './CommonStyle.css';

// Lazy load the ProductModal component
const ProductModal = React.lazy(() => import('./ProductModal'));

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { products, loading, error } = useFetchProducts(page, filters);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useInfiniteScroll(loadMore);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="product-list">
      <Filters setFilters={setFilters} />
      
      {loading && <div className="loading-indicator">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
      
      {loading && !selectedProduct && (
        <div className="loading-more-indicator">
          <div className="loading-spinner"></div>
          <p>Loading more products...</p>
        </div>
      )}

      {/* Lazy load ProductModal with Suspense */}
      <Suspense fallback={<div>Loading Modal...</div>}>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ProductList;
