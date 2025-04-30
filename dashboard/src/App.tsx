import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Header from './components/Header/Header';
import ProductCard from './components/ProductCard/ProductCard';

function App() {
  return (
    <div className="App">
      <Header/>
      <ProductList/>
    </div>
  );
}

export default App;
