'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { validateIdentity } from "@/lib/validateIdentity";

export function RegisterForm() {
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [parola, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dogumYili, setDogumYili] = useState(""); // Yalnızca yıl olarak alıyoruz
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parola !== confirmPassword) {
      setErrorMessage("Şifreler uyuşmuyor!");
      return;
    }

    // Yalnızca yıl alınacak
    const DogumYili = dogumYili;

    try {
      const isIdentityValid = await validateIdentity({
        TCKimlikNo: tcKimlikNo,
        ad,
        soyad,
        DogumYili,
      });

      if (!isIdentityValid) {
        setErrorMessage("Kimlik bilgileri doğrulanamadı.");
        return;
      }
    } catch (error) {
      setErrorMessage("Kimlik doğrulama sırasında hata oluştu.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tcKimlikNo,
          ad: ad,
          soyad: soyad,
          parola,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Kullanıcı kaydedilemedi.");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setErrorMessage("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-10"
    >
      <h2 className="text-center text-2xl font-semibold mb-4">Üye Ol</h2>

      <input
        type="text"
        placeholder="Ad"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <input
        type="text"
        placeholder="Soyad"
        value={soyad}
        onChange={(e) => setSoyad(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <input
        type="text"
        placeholder="TC Kimlik No"
        value={tcKimlikNo}
        onChange={(e) => setTcKimlikNo(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      {/* Yalnızca yıl seçimi yapılacak */}
      <input
        type="number"
        placeholder="Doğum Yılı"
        value={dogumYili}
        onChange={(e) => setDogumYili(e.target.value)}
        className="border p-2 rounded mb-4"
        required
        min="1900" // Yıl 1900'den küçük olmasın
        max="2099" // Yıl 2099'dan büyük olmasın
      />

      <input
        type="password"
        placeholder="Şifre"
        value={parola}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      <input
        type="password"
        placeholder="Şifreyi Tekrar Girin"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 rounded mb-4"
        required
      />

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      <Button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Kayıt Yapılıyor..." : "Üye Ol"}
      </Button>
    </form>
  );
}
