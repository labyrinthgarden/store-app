import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const API_URL = import.meta.env.VITE_API_URL;

const CheckoutForm = ({ cartItems, clearCart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        try {
            // Llamamos al backend NestJS para crear el PaymentIntent
            

            const { data } = await axios.post(`${API_URL}/payments/create-payment-intent`, {
                amount: Math.round(total * 100), // en centavos
                currency: 'usd'
            });

            const clientSecret = data.clientSecret;

            // Confirmamos el pago con Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        address: {
                            city: formData.city,
                            line1: formData.address,
                            postal_code: formData.zipCode,
                        },
                    },
                },
            });

            if (error) {
                alert(`Error: ${error.message}`);
            } else if (paymentIntent.status === 'succeeded') {
                alert('¡Pago realizado con éxito!');
                clearCart();
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            alert('Ocurrió un error al procesar el pago');
        }
        setLoading(false);
    };

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

                            <h2 className="mb-3">Método de pago</h2>
                            <div className="form-group">
                                <CardElement className="form-control" />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                                disabled={!stripe || loading}
                            >
                                {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    <div className="col-4">
                        <div className="checkout-summary">
                            <h3 className="summary-title">Resumen del pedido</h3>

                            {cartItems.map((item) => (
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

export default CheckoutForm;
