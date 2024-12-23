import React from 'react';
import ProductList from './components/ProductList';
import './components/CommonStyle.css';

const App = () => {
  return (
    <div className="app">
      <h1>Product Dashboard</h1>
      <ProductList />
    </div>
  );
};

export default App;
