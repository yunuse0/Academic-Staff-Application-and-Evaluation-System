'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "jury" | "admin" | "ilanYonetici">("candidate");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      switch (userRole) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "YONETICI":
          router.push("/yonetici");
          break;
        case "JURI_UYESI":
          router.push("/jury");
          break;
        case "ADAY":
        default:
          router.push("/IlanlarPage");
          break;
      }
    } else {
      setCheckingToken(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tcKimlikNo, parola: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Giriş başarısız");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id.toString());

      const backendRole = data.user.role;

      switch (backendRole) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "YONETICI":
          router.push("/IlanYonetimi");
          break;
        case "JURI_UYESI":
          router.push("/jury");
          break;
        case "ADAY":
        default:
          router.push("/IlanlarPage");
          break;
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-10"
    >
      <h2 className="text-center text-2xl font-semibold mb-4">Akademik Başvuru Giriş</h2>

      <input
        type="text"
        placeholder="TC Kimlik No"
        value={tcKimlikNo}
        onChange={(e) => setTcKimlikNo(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <Button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-4">
        <p>Kocaeli Üniversitesi Atama Başvuru Sistemine hoş geldiniz! Lütfen devam etmek için giriş yapın.</p>
        <br></br>
        <p>Henüz üye değil misiniz? Aşağıya tıklayarak üye olun.</p>
      </div>

      <div className="mt-6 text-center">
        <Button
          onClick={() => router.push("/register")}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
        >
          Üye Ol
        </Button>
      </div>
    </form>
  );
}
