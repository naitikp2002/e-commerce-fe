"use client";
import { useOrders } from "@/hooks/queries/use-orders";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: string;
  total_amount: number;
  payment_status: string;
  total_items: number;
  createdAt: string;
}
import { useSelector } from "react-redux";
import Link from "next/link";
import { format } from "date-fns";

const OrdersListUser = () => {
  const id = useSelector((state: RootState) => state?.user?.user?.id);

  const { data: ordersList, isLoading } = useOrders(
    id ? id.toString() : undefined
  );

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersList?.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{order?.total_items}</TableCell>
                <TableCell>${order?.total_amount?.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold`}
                  >
                    {order.payment_status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`} passHref>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">View order details</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersListUser;
