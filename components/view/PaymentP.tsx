"use clint";
import React, { useEffect } from "react";
import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/app/(user)/checkout/page";
import Checkoutpage from "./Checkoutpage";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const PaymentP = () => {
    const amount = 10;
//   const [clientSecret, setClientSecret] = React.useState(null);
//   useEffect(() => {
//     fetch("http://localhost:8080/create-checkout-session", { method: "POST" })
//       .then((response) => response.json())
//       .then((json) => setClientSecret(json.clientSecret));
//   }, []);

//   if (clientSecret) {
//     console.log(clientSecret);
//     return (
//       <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
//         <CheckoutForm />
//       </CheckoutProvider>
//     );
//   }
  return <>
  <Elements stripe={stripe}
  options={{
    mode: "payment",
    amount: (amount * 100),
    currency: "usd",
  }}>
    <Checkoutpage amount={amount} />
  </Elements>
  </>;
};

export default PaymentP;
