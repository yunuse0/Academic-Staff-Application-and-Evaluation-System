"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

type Basvuru = {
  id: number;
  durum: "BEKLIYOR" | "KABUL" | "RED";
  tarih: string;
  ilan: {
    id: number;
    baslik: string;
  };
};

const KullaniciBasvurularPage = () => {
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBasvurular = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("Kullanıcı ID bulunamadı.");
        setError("Kullanıcı ID bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(` http://localhost:3001/api/adayBasvuru?kullaniciId=${userId}`);
        if (!response.ok) {
          throw new Error("Başvurular alınamadı.");
        }
        const data = await response.json();
        setBasvurular(data);
      } catch (error) {
        console.error("Başvuru getirme hatası:", error);
        setError("Başvurular getirilemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchBasvurular(); // useEffect içinde fetch fonksiyonunu çağırıyoruz
  }, []); // Boş array, component mount olduğunda bir kez çalışmasını sağlıyor

  const durumBadge = (durum: string) => {
    switch (durum) {
      case "BEKLIYOR":
        return <span className="text-yellow-600 font-semibold">Bekliyor</span>;
      case "KABUL":
        return <span className="text-green-600 font-semibold">Kabul Edildi</span>;
      case "RED":
        return <span className="text-red-600 font-semibold">Reddedildi</span>;
      default:
        return <span className="text-gray-600">Bilinmiyor</span>;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen"
        style={{
          backgroundImage: "url('/banner2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >

        <div className="max-w-4xl mx-auto">

          <div className="bg-white p-6 rounded-lg shadow-lg">

            <h1 className="text-3xl font-bold text-center text-blue-700">Başvurularım</h1>


            <div className="flex justify-between mt-10">
              <Button
                onClick={() => router.push("/")}
                className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
              >
                Ana Sayfaya Dön
              </Button>
              <Button
                onClick={() => router.push("/adaycv")}
                className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
              >
                Özgeçmişimi Düzenle
              </Button>
              <Button
                onClick={() => router.push("/adaycv/ozgecmisim")}
                className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
              >
                Özgeçmişimi İncele
              </Button>
            </div>
            <br></br><hr></hr><br></br>
            {basvurular.length === 0 ? (
              <p className="text-center text-gray-600">Henüz bir başvurunuz bulunmuyor.</p>
            ) : (
              <div className="space-y-4">
                {basvurular.map((basvuru) => (
                  <div key={basvuru.id} className="p-4 bg-white rounded shadow-md">
                    <h2 className="text-xl font-semibold text-blue-600">{basvuru.ilan.baslik}</h2>
                    <p className="text-gray-700">Başvuru Tarihi: {new Date(basvuru.tarih).toLocaleDateString()}</p>
                    <p className="mt-1">Durum: {durumBadge(basvuru.durum)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KullaniciBasvurularPage;
