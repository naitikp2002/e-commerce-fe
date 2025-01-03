"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/view/admin-sidebar";
import { getUser } from "@/lib/auth";
import Header from "@/components/view/Header";
import { useCartDetails } from "@/hooks/queries/use-cart";
import { useDispatch } from "react-redux";
import { setCart } from "@/store/features/cartSlice";
import { CartResponse } from "@/types/cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = getUser();
  const { data: cartItems, isLoading, isSuccess } = useCartDetails();

   const subtotal = cartItems?.reduce(
      (sum: number, item: CartResponse) =>
        sum + item?.product?.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;
  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/login");
    }
  }, [user, router]);

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

  return (
    <>
      <Header />
      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
