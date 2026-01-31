import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import GlobalStyle from './GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <GlobalStyle />
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
