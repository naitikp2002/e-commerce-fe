"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  useCartDetails,
  useUpdateCartDetails,
} from "../../../hooks/queries/use-cart";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { Product } from "@/types/products";
import { CartResponse } from "@/types/cart";
import Link from "next/link";
import Image from "next/image";
import { setCart } from "@/store/features/cartSlice";
import { useDispatch } from "react-redux";
// Dummy data for cart items
// const initialCartItems = [
//   { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
//   { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
//   { id: 3, name: "Product 3", price: 39.99, quantity: 3 },
// ];

export default function CartPage() {
  const dispatch = useDispatch();
  const updateCart = useUpdateCartDetails();
  const { data: cartItems, isLoading, isSuccess } = useCartDetails();

  const subtotal = cartItems?.reduce(
    (sum: number, item: CartResponse) =>
      sum + item?.product?.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setCart({
          cartItemList: cartItems,
          total: total,
          subTotal: subtotal,
          tax: tax,
        })
      );
    }
  }, [cartItems, isSuccess]);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-5 p-3 justify-center items-center">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems?.map((item: CartResponse) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      className="w-20 h-20 rounded-md object-contain"
                      src={JSON.parse(item?.product?.images)?.[0]}
                      alt={item?.product?.name}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/products/${item?.product?.id}`}>
                      {item?.product?.name}
                    </Link>
                  </TableCell>
                  <TableCell>${item?.product?.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateCart.mutateAsync({
                            productId: item?.product_id,
                            quantity: -1,
                          })
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item?.quantity}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateCart.mutateAsync({
                            productId: item?.product_id,
                            quantity: 1,
                          })
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${(item?.product?.price * item?.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => {}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax?.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total?.toFixed(2)}</span>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
