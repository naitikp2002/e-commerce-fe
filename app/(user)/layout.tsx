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

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = getUser();
  const { data: cartItems, isLoading, isSuccess } = useCartDetails();

  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setCart({
          cartItemList: cartItems
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
