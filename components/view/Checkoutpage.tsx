import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";

const Checkoutpage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8080/create-checkout-session", {
        amount: amount * 100,
      })
      .then((response) => {
        console.log(response.data);
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message || "");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "");
    }
    else{
        
    }
    setLoading(false);
  };

  if(!clientSecret || !stripe || !elements){
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}

        {errorMessage && <div>{errorMessage}</div>}

        <Button
          disabled={!stripe || loading}
          className="mt-3 text-white w-full p-5 rounded-md disabled:opacity-50 disabled:animate-pulse"
        >
          {" "}
          {!loading ? `Pay $${amount} ` : "Processing..."}
        </Button>
      </form>
    </div>
  );
};

export default Checkoutpage;
