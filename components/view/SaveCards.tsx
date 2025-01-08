"use client";
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAddtoSaveCard } from "@/hooks/queries/use-saveCards";
import StripeCardForm from "../common/stripeCardForm";
const SaveCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const { mutateAsync: saveCard, data } = useAddtoSaveCard();

  const handleSaveCard = async () => {
    // Request SetupIntent client_secret from the backend
    const data = await saveCard();

    const clientSecret = data.clientSecret;

    if (!stripe || !elements) {
      throw new Error("Stripe.js has not loaded");
    }

    // Confirm the SetupIntent
    const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (error) {
      console.error(error.message);
      setStatus("Failed to save card.");
      return;
    }
  };

  return (
    <>
      <div>
        <StripeCardForm/>
      </div>
      {/* <div className="w-full h-[100%] max-w-md mx-auto border p-4 rounded-md">
        <CardElement />
        <Button className="mt-2" onClick={handleSaveCard}>
          Save Card
        </Button>
        {status && <p>{status}</p>}
      </div> */}
    </>
  );
};

export default SaveCard;
