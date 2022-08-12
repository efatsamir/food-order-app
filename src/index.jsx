import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MealsProvider from './store/MealsProvider';
import CartProvider from './store/CartProvider';


ReactDOM.render(
  <React.StrictMode>
    <MealsProvider >
      <CartProvider>

        <App />

      </CartProvider>  
    </MealsProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);


