"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Link from "next/link";
import React from "react";

export default function Home() {

  const router = useRouter();

  const handleDevamEt = () => {
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
      router.push("/login"); // Eğer token veya userRole yoksa login sayfasına yönlendir
    }
  };

  return (
    <div>
      <Navbar />

      <main
        className="flex flex-col items-center justify-center min-h-screen bg-stone-200 p-6"
        style={{
          backgroundImage: "url('/banner2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <br />
        {/* Ana içerik alanı */}
        <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Akademik Başvuru Sistemi
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Kocaeli Üniversitesi Akademik Başvuru Sistemi'ne hoş geldiniz! Bu sistem, akademik ilanlarınızı ve başvurularınızı kolayca oluşturmanızı, güncellemenizi ve takip etmenizi sağlar. Lütfen giriş yapın veya giriş yaptıysanız, ilanlarınızı görüntülemek için aşağıdaki butona tıklayın.
          </p>

          {/* Giriş butonu */}
          <div className="flex flex-col gap-4 bg-black text-white">
            <Button
              onClick={handleDevamEt}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Devam Et
            </Button>
          </div>
        </div>

        {/* Diğer kısımlar aynı */}
        {/* İlanlar ve Duyurular */}
        <div className="mt-12 w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Güncel İlanlar</h2>
          <Link href="/login" className="text-red-500 hover:underline mt-2 block">
            İlanları görüntülemek ve başvuru yapmak için buraya tıklayabilirsiniz.
          </Link>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Yeni Başvuru İlanı: Bilimsel Araştırma Bursu</h3>
              <p className="text-gray-600">Son başvuru tarihi: 30 Nisan 2025</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Yeni Başvuru İlanı: Öğretim Üyesi Aranıyor</h3>
              <p className="text-gray-600">Son başvuru tarihi: 15 Mayıs 2025</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Yeni Başvuru İlanı: Akademik Kongre Katılım Desteği</h3>
              <p className="text-gray-600">Son başvuru tarihi: 5 Haziran 2025</p>
            </div>
          </div>
        </div>

        {/* Reklam ve Bilgi Alanı */}
        <div className="mt-12 w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Akademik İhtiyaçlarınızı Karşılayacak Çözümler
          </h2>
          <div className="flex gap-6">
            <div className="flex-1 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Akademik Yazılım Çözümleri</h3>
              <p className="text-gray-600">Araştırmalarınızı hızlandırmak için en iyi yazılım araçları. Şimdi keşfedin.</p>
            </div>
            <div className="flex-1 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">Uluslararası Akademik Burslar</h3>
              <p className="text-gray-600">Uluslararası burslar ve destekler hakkında bilgi alabilirsiniz.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
