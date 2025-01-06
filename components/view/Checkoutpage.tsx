import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Checkoutpage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(
    (state: RootState) => state?.cart?.cartItemList
  );
  const TotalAmount = useSelector((state: RootState) => state?.cart?.total);
  const selectedAddress = useSelector((state: RootState) => state?.cart?.selectedAddress);

  const userId = useSelector((state: RootState) => state?.user?.user?.id);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (TotalAmount && cartItems) {
      axios
        .post("http://localhost:8080/api/payment/create-checkout-session", {
          amount: (TotalAmount ?? 0) * 100,
          selectedAddress,
          userId // Pass reduced cartItems to the API
        })
        .then((response) => {
          console.log(response.data);
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating checkout session:", error);
        });
    }
  }, [TotalAmount, cartItems]); // Add cartItems to the dependency array

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
        return_url: `http://localhost:3000/payment-success?amount=${TotalAmount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "");
    } else {

    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
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
          {!loading ? `Pay $${TotalAmount} ` : "Processing..."}
        </Button>
      </form>
    </div>
  );
};

export default Checkoutpage;
