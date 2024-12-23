import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (page = 1, limit = 10, filters = {}) => {
  const { category, priceRange, rating } = filters;
  let url = `${API_URL}?_page=${page}&_limit=${limit}`;

  if (category) url += `&category=${category}`;
  if (priceRange) url += `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`;
  if (rating) url += `&rating_gte=${rating}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
