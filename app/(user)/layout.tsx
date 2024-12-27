"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/view/admin-sidebar";
import { getUser } from "@/lib/auth";
import Header from "@/components/view/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <Header />
      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
