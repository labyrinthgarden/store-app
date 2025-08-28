import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51S18eXGzj25R2Hi8zs1i5tZvgYGCeRt2bifgq07xTTBGwB4t28wTNnOmW03rEAWRnWizAKZYpIKkuPPERrODHnah00QVJ4vlQw'
);

const Checkout = ({ cartItems, clearCart }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} clearCart={clearCart} />
    </Elements>
  );
};

export default Checkout;
