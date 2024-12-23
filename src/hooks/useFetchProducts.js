import { useState, useEffect } from 'react';

const useFetchProducts = (page, filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();

        // Apply filtering on the fetched data
        let filteredData = data;

        // Filter by category if selected
        if (filters.category) {
          filteredData = filteredData.filter(
            (product) => product.category === filters.category
          );
        }

        // Filter by price range
        if (filters.priceRange) {
          filteredData = filteredData.filter(
            (product) =>
              product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
          );
        }

        // Filter by rating if selected
        if (filters.rating) {
          filteredData = filteredData.filter(
            (product) => product.rating?.rate >= parseFloat(filters.rating)
          );
        }

        // Sort by price
        if (filters.sortBy === 'low-to-high') {
          filteredData = filteredData.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'high-to-low') {
          filteredData = filteredData.sort((a, b) => b.price - a.price);
        }

        // Paginate the results: 9 items per page
        const startIndex = (page - 1) * 9; // Adjust for page-based indexing
        const paginatedData = filteredData.slice(startIndex, startIndex + 9);

        // Append new products for subsequent pages
        setProducts((prevProducts) =>
          page === 1 ? paginatedData : [...prevProducts, ...paginatedData]
        );
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, filters]);

  return { products, loading, error };
};

export default useFetchProducts;
