"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useAddtoSaveCard } from "@/hooks/queries/use-saveCards";

export default function StripeCardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutateAsync: saveCard, data } = useAddtoSaveCard();

  const handleSaveCard = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-6 h-6" />
          <span>Add Payment Method</span>
        </CardTitle>
        <CardDescription>
          Enter your card details to save a new payment method
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSaveCard}>
        <CardContent>
          <div className="mt-4 space-y-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              className="p-3 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Save Card"}
          </Button>
          {status && (
            <p
              className={`mt-4 text-center ${
                status.startsWith("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {status}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
