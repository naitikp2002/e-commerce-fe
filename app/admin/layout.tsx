"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/view/sidebar"
import { getUser } from "@/lib/auth"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = getUser()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  // if (!user || user.role !== "admin") {
  //   return <div>You are not authorized to access this page</div>;
  // }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="w-[80vw]">{children}</div>
      </main>
    </SidebarProvider>
  )
}
