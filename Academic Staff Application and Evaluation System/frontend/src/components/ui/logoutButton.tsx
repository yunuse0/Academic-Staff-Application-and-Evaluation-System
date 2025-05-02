'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // LocalStorage temizle
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    // Login sayfasına yönlendir
    router.push("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
    >
      Çıkış Yap
    </Button>
  );
}
