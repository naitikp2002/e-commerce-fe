import React from 'react';
import {PaymentElement, useCheckout} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const checkout = useCheckout();
  return (
    <form>
      <PaymentElement options={{layout: 'accordion'}}/>
    </form>
  )
};

export default CheckoutForm;