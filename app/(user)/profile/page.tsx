"use client";
import ProfileForm from "@/components/view/profilePage";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Profile = () => {
  const router = useRouter();
  const handleLogout = () => {
    try {
      // Remove specific cookies
      Cookies.remove("token");
      Cookies.remove("user");
      // ... any other auth-related cookies

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileForm />
      <Button
        variant="ghost"
        className="flex items-center gap-2 justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};

export default Profile;
