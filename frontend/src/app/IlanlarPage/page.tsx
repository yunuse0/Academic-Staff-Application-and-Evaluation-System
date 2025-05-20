"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";

type Ilan = {
  id: number;
  baslik: string;
  aciklama: string;
  kadro: "DR_OGR_UYESI" | "DOCENT" | "PROFESOR";
  baslangicTarihi: string;
  bitisTarihi: string;
  kriterler: string;
  durum: "ACIK" | "KAPALI";
  basvuruSayisi: number;
};

const IlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [basvurulanIlanlar, setBasvurulanIlanlar] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/ilanGetir");
        const data = await response.json();
        setIlanlar(data);
      } catch (error) {
        console.error("İlanlar çekilemedi:", error);
      }
    };

    const fetchBasvurularim = async () => {
      const kullaniciId = localStorage.getItem("userId");
      if (!kullaniciId) return;

      try {
        const response = await fetch(`http://localhost:3001/api/adayBasvuru?kullaniciId=${kullaniciId}`);
        const data = await response.json();

        const ilanIdListesi = data.map((item: { ilanId: number }) => item.ilanId);
        setBasvurulanIlanlar(ilanIdListesi);
      } catch (error) {
        console.error("Başvurular çekilemedi:", error);
      }
    };

    const fetchData = async () => {
      await fetchIlanlar();
      await fetchBasvurularim();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleBasvuruYap = async (ilanId: number) => {
    const kullaniciId = localStorage.getItem("userId");

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/basvuruYap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kullaniciId: parseInt(kullaniciId), ilanId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Başvuru yapılamadı");
        return;
      }

      alert("Başvuru başarıyla yapıldı!");

      // Başvuru yapınca başvurular güncellensin
      const updatedBasvurular = await fetch(`http://localhost:3001/api/adayBasvuru?kullaniciId=${kullaniciId}`);
      const updatedData = await updatedBasvurular.json();
      const updatedIlanIdListesi = updatedData.map((item: { ilanId: number }) => item.ilanId);
      setBasvurulanIlanlar(updatedIlanIdListesi);

    } catch (error) {
      console.error("Başvuru hatası:", error);
      alert("Başvuru sırasında bir hata oluştu.");
    }
  };

  const handleProfilimClick = () => {
    router.push("/AdayPage");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-stone-200">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

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

        <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8 relative">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Tüm İlanlar
          </h1>
          <div className="flex justify-between mt-10">
            <Button
              onClick={() => router.push("/")}
              className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
            >
              Ana Sayfaya Dön
            </Button>
            <Button
              onClick={() => router.push("/AdayPage")}
              className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
            >
              Profilim
            </Button>

          </div>



          {ilanlar.length === 0 ? (
            <p className="text-center text-gray-600">Şu anda kayıtlı ilan bulunmamaktadır.</p>
          ) : (
            <div className="grid gap-6">
              <br></br><hr></hr>
              <p className="text-center text-gray-800">Dikkat!</p>
              <p className="text-center text-gray-800"> Lütfen başvuru yapmadan önce profilinizden özgeçmişinizdeki ilgili alanları doldurunuz. Aksi takdirde başvurunuz geçersiz sayılacaktır.</p>
              <hr></hr>
              {ilanlar.map((ilan) => (
                <div key={ilan.id} className="p-6 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-2">{ilan.baslik}</h2>
                  <p className="text-gray-700 mb-4">{ilan.aciklama}</p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Kadro Türü:</strong> {ilan.kadro}</p>
                    <p><strong>Başlangıç:</strong> {new Date(ilan.baslangicTarihi).toLocaleDateString()}</p>
                    <p><strong>Bitiş:</strong> {new Date(ilan.bitisTarihi).toLocaleDateString()}</p>
                    <p><strong>Kriterler:</strong> {ilan.kriterler}</p>
                    <p>
                      <strong>Durum:</strong>{" "}
                      <span className={ilan.durum === "ACIK" ? "text-green-600" : "text-red-600"}>
                        {ilan.durum === "ACIK" ? "Açık" : "Kapalı"}
                      </span>
                    </p>
                    <p><strong>Başvuru Sayısı:</strong> {ilan.basvuruSayisi}</p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    {basvurulanIlanlar.includes(ilan.id) ? (
                      <span className="text-green-600 font-semibold">Başvuruldu ✅</span>
                    ) : (
                      <Button onClick={() => handleBasvuruYap(ilan.id)}>
                        Başvur
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/">
              <span className="text-blue-500 hover:underline">Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>

      </main >
    </div >
  );
};

export default IlanlarPage;
