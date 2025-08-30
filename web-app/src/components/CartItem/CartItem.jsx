// src/components/CartItem/CartItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cartEvents from '../../events/cart-events';


const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, item.size, newQuantity);

    // Despachar evento indicando que el carrito cambió
    cartEvents.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: item.id, size: item.size, quantity: newQuantity } }));

  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onUpdateQuantity(item.id, item.size, value);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      <div className="cart-item-details">
        <Link to={`/product/${item.id}`} className="cart-item-name">
          {item.name}
        </Link>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>

        {item.size && (
          <div className="cart-item-size">
            <span>Talla: {item.size}</span>
          </div>
        )}

        <div className="cart-item-color">
          <span>Color: {item.color || 'Negro'}</span>
        </div>

        <button
          className="cart-item-remove"
          onClick={() =>{
            onRemove(item.id, item.size);
            cartEvents.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id: item.id, size: item.size, removed: true } }));
          }}
        >
          <i className="fas fa-trash"></i> Eliminar
        </button>
      </div>

      <div className="cart-item-quantity">
        <label>Cantidad:</label>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            className="quantity-input"
            value={item.quantity}
            onChange={handleInputChange}
            min="1"
          />
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-total">
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartItem;
