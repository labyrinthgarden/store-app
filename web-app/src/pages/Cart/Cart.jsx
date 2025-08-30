import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import cartEvents from '../../events/cart-events.js';
import './Cart.css';


const Cart = ({ cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const [items, setItems] = useState(cartItems);
  const navigate = useNavigate();
  useEffect(() => {
    const handleCartUpdate = (event) => {
      const { id, size, quantity, removed } = event.detail;
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      );
    };

    cartEvents.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      cartEvents.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);
  // Calcular totales
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 && subtotal < 100 ? 5.99 : 0;
  const discount = subtotal > 200 ? subtotal * 0.1 : 0; // 10% de descuento para compras > $200
  const total = subtotal + shipping - discount;

  // Manejar el proceso de checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega algunos productos antes de proceder al pago.');
      return;
    }
    navigate('/checkout');
  };

  // Continuar comprando
  const continueShopping = () => {
    navigate('/products');
  };

  // Vaciar carrito
  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
      clearCart();
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> / <span>Carrito de Compras</span>
        </div>

        <h1 className="section-title-cart">Tu Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has agregado productos a tu carrito.</p>
            <button
              className="btn btn-primary"
              onClick={continueShopping}
            >
              Continuar Comprando
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="cart-header">
                <h2>Productos ({cartItems.length})</h2>
                <button
                  className="btn-clear"
                  onClick={handleClearCart}
                >
                  <i className="fas fa-trash"></i> Vaciar carrito
                </button>
              </div>

              <div className="cart-items">
                {cartItems.map(item => (
                  <CartItem
                    key={`${item.id}-${item.size || 'no-size'}`}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="continue-shopping">
                <Link to="/products">
                  <i className="fas fa-arrow-left"></i> Continuar comprando
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="cart-summary">
                <h3 className="summary-title">Resumen de compra</h3>

                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-item discount">
                    <span>Descuento (10%):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-item">
                  <span>Envío:</span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>

                {subtotal > 0 && subtotal < 100 && (
                  <div className="shipping-notice">
                    <i className="fas fa-info-circle"></i>
                    <span>¡Faltan ${(100 - subtotal).toFixed(2)} para envío gratis!</span>
                  </div>
                )}

                <div className="summary-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="btn btn-primary btn-checkout"
                  onClick={handleCheckout}
                >
                  Proceder al pago
                </button>

                <div className="payment-methods">
                  <p>Métodos de pago aceptados:</p>
                  <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-cc-paypal"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
