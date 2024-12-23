import React, { useState } from 'react';
import './CommonStyle.css';
import {
  CATEGORY_OPTIONS,
  RATING_OPTIONS,
  SORT_BY_OPTIONS,
  PRICE_RANGE,
} from '../utils/constants';

const Filters = ({ setFilters }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([PRICE_RANGE.min, PRICE_RANGE.max]); 
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState(''); 

  // Update filters dynamically
  const updateFilters = (newFilters) => {
    setFilters({
      category,
      priceRange,
      rating,
      sortBy,
      ...newFilters, 
    });
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    updateFilters({ category: newCategory });
  };

  const handlePriceChange = (e) => {
    const newPriceRange = [PRICE_RANGE.min, Number(e.target.value)];
    setPriceRange(newPriceRange);
    updateFilters({ priceRange: newPriceRange });
  };

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setRating(newRating);
    updateFilters({ rating: newRating });
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    updateFilters({ sortBy: newSortBy });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Category:</label>
        <select onChange={handleCategoryChange} value={category}>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range:</label>
        <div className="range-input">
          <span className="range-min">${PRICE_RANGE.min}</span>
          <input
            type="range"
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
          <span className="range-max">${PRICE_RANGE.max}</span>
        </div>
        <div className="range-selected">Selected: ${priceRange[1]}</div>
      </div>

      <div className="filter-group">
        <label>Rating:</label>
        <select onChange={handleRatingChange} value={rating}>
          {RATING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By:</label>
        <select onChange={handleSortChange} value={sortBy}>
          {SORT_BY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
