// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item.id === product.id && item.size === product.size);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === product.size
          ? {...item, quantity: item.quantity + product.quantity}
          : item
      ));
    } else {
      setCartItems([...cartItems, {...product}]);
    }
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.size === size)));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === productId && item.size === size
        ? {...item, quantity: newQuantity}
        : item
    ));
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="app">
        <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Products
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                <Products
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              }
            />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
