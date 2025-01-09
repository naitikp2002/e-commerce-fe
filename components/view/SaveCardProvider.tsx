"use clint";
import React, { useEffect, useState } from "react";
import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/app/(user)/checkout/page";
import Checkoutpage from "./Checkoutpage";
import SaveCard from "@/components/view/SaveCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ViewIcon as Visa,
  CreditCardIcon as Mastercard,
  CreditCard,
} from "lucide-react";

import { useGetSavedCards } from "@/hooks/queries/use-saveCards";
import { CardResponse } from "@/types/order";
import StripeCardForm from "../common/stripeCardForm";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
export default function SaveCardProvider() {
  const { data: savedCards, isLoading: cardsLoading } = useGetSavedCards();
  console.log(savedCards);
  const handleCardSelect = (paymentMethodId: string) => {
    console.log("Selected Card PaymentMethod ID:", paymentMethodId);
    // Pass this ID to your backend for payment processing
  };
  const getCardIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case "visa":
        return <Visa className="h-6 w-6 text-blue-600" />;
      case "mastercard":
        return <Mastercard className="h-6 w-6 text-red-500" />;
      default:
        return <CreditCard className="h-6 w-6 text-gray-500" />;
    }
  };

  if (cardsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Elements stripe={stripe}>
        <div className="md:flex gap-3 sm:block">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Elements stripe={stripe}>
              <StripeCardForm />
            </Elements>
          </div>

          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle>Saved Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              {savedCards?.map((card: CardResponse, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {getCardIcon(card.card.display_brand)}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">
                      {card.card.display_brand.charAt(0).toUpperCase() +
                        card.card.display_brand.slice(1)}{" "}
                      ({card.card.last4})
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.card.exp_month.toString().padStart(2, "0")}/
                      {card.card.exp_year.toString().slice(-2)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Elements>
    </>
  );
}
