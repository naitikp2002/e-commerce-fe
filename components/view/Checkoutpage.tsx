import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CreditCard, Plus } from "lucide-react";
import SavedCardsSelector from "../common/saved-cards-selector";
import { CardResponse, Card as CartType } from "@/types/order";
import { useGetSavedCards } from "@/hooks/queries/use-saveCards";
import { toast } from "sonner";
import { usePaymentBySavedCard } from "@/hooks/queries/use-payment";

const Checkoutpage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(
    (state: RootState) => state?.cart?.cartItemList
  );
  const TotalAmount = useSelector((state: RootState) => state?.cart?.total);
  const selectedAddress = useSelector(
    (state: RootState) => state?.cart?.selectedAddress
  );

  const userId = useSelector((state: RootState) => state?.user?.user?.id);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState<CardResponse | null>(null);
  const { data: savedCards, isLoading } = useGetSavedCards();
  const { mutate: makePayment } = usePaymentBySavedCard();

  useEffect(() => {
    if (TotalAmount && cartItems) {
      axios
        .post("http://localhost:8080/api/payment/create-checkout-session", {
          amount: (TotalAmount ?? 0) * 100,
          selectedAddress,
          userId, // Pass reduced cartItems to the API
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

  const handlePaymentUsingCard = async () => {
    if (!selectedCard) {
      toast.error("Please select a card");
      return;
    }

    // try {
    makePayment({
      paymentMethodId: selectedCard.id,
      amount: TotalAmount! * 100,
      selectedAddress: selectedAddress!
    });
    // } catch (error) {
    //   console.error("Error making payment:", error);
    //   toast.error("Payment failed");
    // }
  };
  const handleSubmit = async (event: React.MouseEvent) => {
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
  const handleCardSelect = (card: CardResponse) => {
    setSelectedCard(card);
    console.log("Selected card:", card);
    // Here you would typically initiate the payment process with the selected card
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full p-3 ">
            Add Payment method <CreditCard />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div>
            {clientSecret && <PaymentElement />}
            {errorMessage && <div>{errorMessage}</div>}
          </div>
          <DialogFooter>
            <Button
              disabled={!stripe || loading}
              onClick={(e) => handleSubmit(e)}
              className="mt-3 text-white w-full p-5 rounded-md disabled:opacity-50 disabled:animate-pulse"
            >
              {" "}
              {!loading ? `Pay $${TotalAmount} ` : "Processing..."}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <main className="flex flex-col items-center justify-center mt-4">
        <SavedCardsSelector
          cards={savedCards}
          onSelectCard={handleCardSelect}
        />
        {selectedCard && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
            Payment will be processed using the selected card ending in{" "}
            {selectedCard.card.last4}
          </div>
        )}
        <div className="mt-6 w-full">
          <Button className="w-full p-3" onClick={handlePaymentUsingCard}>
            {!loading ? `Pay $${TotalAmount} ` : "Processing..."}
          </Button>
        </div>
      </main>

      {/* <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        
        {errorMessage && <div>{errorMessage}</div>}

        <Button
          disabled={!stripe || loading}
          className="mt-3 text-white w-full p-5 rounded-md disabled:opacity-50 disabled:animate-pulse"
        >
          {" "}
          {!loading ? `Pay $${TotalAmount} ` : "Processing..."}
        </Button>
      </form> */}
    </div>
  );
};

export default Checkoutpage;
