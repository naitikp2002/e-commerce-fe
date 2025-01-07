"use client";
import {
  ArrowLeft,
  CircleDollarSign,
  CreditCard,
  IndianRupee,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetOrdersDetails } from "@/hooks/queries/use-orders";
import { useEffect } from "react";

type OrderItem = {
  product_name: string;
  quantity: number;
  product: {
    price: number;
  };
};
import { format } from "date-fns";
import { useGetAddressById } from "@/hooks/queries/use-address";

// Mock function to get order details
// function getOrderDetails(id: string) {
//   // In a real application, this would fetch data from an API or database
//   const { data } = useGetOrdersDetails(id);
//   return data;
// }

export default function OrderDetails({ params }: { params: { id: string } }) {
  const { data: order, isLoading: detailsLoading } = useGetOrdersDetails(
    params.id
  );
  const { data: address, isLoading: addressLoading } = useGetAddressById(
    order?.address_id
  );

  if (detailsLoading || addressLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <Link href="/profile" passHref>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </Link>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Order #{order?.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Date:</span>
                {order?.createdAt && (
                  <span>
                    {format(new Date(order?.createdAt), "MMM dd, yyyy")}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Customer:</span>
                <span>{address?.address?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status:</span>
                <Badge variant="outline">{order?.payment_status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">
                  ${order?.total_amount?.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic">
              <p>{address?.address?.name},</p>
              {/* <p>{address?.address?.email}</p> */}
              <br></br>
              <p>{address?.address?.street_address}</p>
              <p>
                {address?.address?.city}, {address?.address?.zip_code}
              </p>
              <p>{address?.address?.country}</p>
            </address>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.order_items.map((item: OrderItem, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell className="text-right">
                      {item?.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item?.product?.price?.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(item.quantity * item?.product?.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold text-right">
                    Sub Total
                  </TableCell>
                  <TableCell className="font-semibold text-right">
                    ${order?.total_sub_amount?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold text-right">
                    Tax
                  </TableCell>
                  <TableCell className="font-semibold text-right">
                    ${order?.tax?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold text-right">
                    Total
                  </TableCell>
                  <TableCell className="font-bold text-right">
                    ${order?.total_amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order?.payment_details?.type === "card" ? (
              <div className="grid gap-4">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Credit Card</span>
                </div>
                <div>
                  <p>
                    {order?.payment_details?.card?.brand}
                    {" card"} ending in {order?.payment_details?.card?.last4}
                  </p>
                </div>
              </div>
            ) : order?.payment_details?.type === "amazon_pay" ? (
              <div className="grid gap-4">
                <div className="flex items-center">
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Amazon Pay</span>
                </div>
                <div>
                  {/* <p>
                    {order?.payment_details?.card?.brand}
                    {" card"} ending in {order?.payment_details?.card?.last4}
                  </p> */}
                </div>
              </div>
            ) : order?.payment_details?.type === "link" ? (
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Link AutoPay</span>
                  </div>
                  <div>
                    {/* <p>
                      {order?.payment_details?.card?.brand}
                      {" card"} ending in {order?.payment_details?.card?.last4}
                    </p> */}
                  </div>
                </div>
              ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
