import { useState, useEffect } from 'react';

const useFetchProducts = (page, filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // New flag for stopping infinite scroll

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();

        let filteredData = data;

        // Apply filters
        if (filters.category) {
          filteredData = filteredData.filter(
            (product) => product.category === filters.category
          );
        }

        if (filters.priceRange) {
          filteredData = filteredData.filter(
            (product) =>
              product.price >= filters.priceRange[0] &&
              product.price <= filters.priceRange[1]
          );
        }

        if (filters.rating) {
          filteredData = filteredData.filter(
            (product) => product.rating?.rate >= parseFloat(filters.rating)
          );
        }

        if (filters.sortBy === 'low-to-high') {
          filteredData.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'high-to-low') {
          filteredData.sort((a, b) => b.price - a.price);
        }

        const startIndex = (page - 1) * 9;
        const paginatedData = filteredData.slice(startIndex, startIndex + 9);

        setHasMore(paginatedData.length > 0); // Stop fetching if no more data

        setProducts((prev) => (page === 1 ? paginatedData : [...prev, ...paginatedData]));
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, filters]);

  return { products, loading, error, hasMore };
};

export default useFetchProducts;
