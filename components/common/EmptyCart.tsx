import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyCart = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Your Cart is Empty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
            <h3 className="font-semibold mb-2">Quick Tips:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Browse our latest collections</li>
              <li>Use filters to find exactly what you need</li>
              <li>Check out our sale items for great deals</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/products" className="flex items-center justify-center">
              Go to Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmptyCart;
