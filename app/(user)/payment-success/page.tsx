import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function OrderConfirmation({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Order Placed Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Thank you for your order. We've received your payment and are
            processing your order.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Order Details:</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-medium">#ORD12345</span>
              </li>
              <li className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-medium text-green-600">${(Number(amount).toFixed(2))}</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
