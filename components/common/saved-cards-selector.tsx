"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  ViewIcon as Visa,
  CreditCardIcon as Mastercard,
} from "lucide-react";

interface SavedCard {
  brand: string;
  display_brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

interface SavedCardsSelectorProps {
  cards: {
    id: number;
    card: SavedCard;
  }[];
  onSelectCard: (card: { id: number; card: SavedCard }) => void;
}

export default function SavedCardsSelector({
  cards,
  onSelectCard,
}: SavedCardsSelectorProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const handleCardSelect = (index: number) => {
    setSelectedCardIndex(index);
    onSelectCard(cards[index]);
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return <Visa className="h-6 w-6 text-blue-600" />;
      case "mastercard":
        return <Mastercard className="h-6 w-6 text-red-500" />;
      default:
        return <CreditCard className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardContent className="pt-6">
        <RadioGroup
          value={selectedCardIndex?.toString()}
          onValueChange={(value) => handleCardSelect(parseInt(value))}
        >
          {cards?.map((card, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <RadioGroupItem value={index.toString()} id={`card-${index}`} />
              <Label
                htmlFor={`card-${index}`}
                className="flex items-center space-x-4 cursor-pointer w-full"
              >
                <div className="flex-shrink-0">
                  {getCardIcon(card.card.display_brand)}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">
                    {card.card.display_brand.charAt(0).toUpperCase() +
                      card.card.display_brand.slice(1)}{" "}
                    ending in {card.card.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {card.card.exp_month.toString().padStart(2, "0")}/
                    {card.card.exp_year.toString().slice(-2)}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
