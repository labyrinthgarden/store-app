import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí procesarías el pago en una aplicación real
    alert('¡Pedido realizado con éxito!');
    navigate('/');
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="section-title">Finalizar Compra</h1>

        <div className="row">
          <div className="col-8">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h2 className="mb-3">Información de envío</h2>

              <div className="form-row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Ciudad</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Código Postal</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <h2 className="my-3">Información de pago</h2>

              <div className="form-group">
                <label className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="form-row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Fecha de expiración</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Realizar pedido
              </button>
            </form>
          </div>

          <div className="col-4">
            <div className="checkout-summary">
              <h3 className="summary-title">Resumen del pedido</h3>

              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <h4 className="order-item-name">{item.name}</h4>
                    <p className="order-item-price">${item.price.toFixed(2)}</p>
                    <p className="order-item-quantity">Cantidad: {item.quantity}</p>
                    {item.size && <p>Talla: {item.size}</p>}
                  </div>
                </div>
              ))}

              <div className="summary-item">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-item">
                <span>Envío:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
