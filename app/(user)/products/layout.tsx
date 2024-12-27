"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/view/admin-sidebar";
import { getUser } from "@/lib/auth";
import Header from "@/components/view/Header";
import UserSidebar from "@/components/view/user-sidebar";

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
      <main className="flex h-screen">
        <div className="hidden md:block flex-none w-1/5 bg-gray-100">
          <UserSidebar />
        </div>
        <div className="flex-grow w-4/5">
          {children}
        </div>
      </main>
    </>
  );
}
