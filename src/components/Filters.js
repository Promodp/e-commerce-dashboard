import React, { useState } from 'react';
import './CommonStyle.css';

const Filters = ({ setFilters }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([10, 1000]); // Default range
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState(''); // New state for sorting

  const handleFilterChange = () => {
    setFilters({
      category,
      priceRange,
      rating,
      sortBy, // Pass sortBy to the parent
    });
  };

  const handlePriceChange = (e) => {
    setPriceRange([10, Number(e.target.value)]);
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range:</label>
        <div className="range-input">
          <span className="range-min">$10</span>
          <input
            type="range"
            min="10"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
          <span className="range-max">$1000</span>
        </div>
        <div className="range-selected">Selected: ${priceRange[1]}</div>
      </div>

      <div className="filter-group">
        <label>Rating:</label>
        <select onChange={(e) => setRating(e.target.value)} value={rating}>
          <option value="">All Ratings</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">None</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default Filters;
