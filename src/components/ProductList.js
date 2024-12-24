import React, { useState, Suspense } from 'react';
import ProductItem from './ProductItem';
import Filters from './Filters';
import useFetchProducts from '../hooks/useFetchProducts';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './CommonStyle.css';

const ProductModal = React.lazy(() => import('./ProductModal'));

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { products, loading, error, hasMore } = useFetchProducts(page, filters);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadMore = () => setPage((prevPage) => prevPage + 1);
  useInfiniteScroll(loadMore);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when filters change
  };

  return (
    <div className="product-list">
      <Filters setFilters={handleFilterChange} />

      {loading && page === 1 && Object.keys(filters).length > 0 && (
        <div className="full-page-loader">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {!loading && products.length === 0 && (
          <p className="no-items-message">No items found</p>
        )}
      <div className="products">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Infinite scroll loader */}
      {hasMore && (
        <div className="loading-more-indicator">
          <div className="loading-spinner"></div>
          <p>Loading Products...</p>
        </div>
      )}

      {/* End of product list */}
      {!hasMore && products.length > 0 && (
        <div className="loading-indicator">
          <p className='loading-text'>You have reached the end of the product list!</p>
        </div>
      )}

      <Suspense fallback={<div>Loading Modal...</div>}>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            isOpen={!!selectedProduct}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ProductList;
