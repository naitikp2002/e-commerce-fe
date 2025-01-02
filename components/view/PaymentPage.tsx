"use clint";
import React, { useEffect } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
  betas: ["custom_checkout_beta_5"],
});
const PaymentPage = () => {
  const [clientSecret, setClientSecret] = React.useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/create-checkout-session", { method: "POST" })
      .then((response) => response.json())
      .then((json) => setClientSecret(json.clientSecret));
  }, []);

  if (clientSecret) {
    console.log(clientSecret);
    return (
      <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
        <CheckoutForm />
      </CheckoutProvider>
    );
  }
  return null;
};

export default PaymentPage;
