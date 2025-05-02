// app/juri/aday/[kullaniciId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVPdf from "@/components/pdf/CVPdf";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

export default function AdayCvIncele() {
  const { kullaniciId } = useParams();
  const [cvData, setCvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rapor, setRapor] = useState("");
  const [durum, setDurum] = useState("");

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/adaycv?kullaniciId=${kullaniciId}`);
        const data = await res.json();

        // 🔽 Buraya ekle
        setCvData({
          makaleler: data.makaleler ?? [],
          kitaplar: data.kitaplar ?? [],
          atiflar: data.atiflar ?? [],
          toplantilar: data.toplantilar ?? [],
          egitimOgretim: data.egitimOgretim ?? [],
          tezler: data.tezler ?? [],
          patentler: data.patentler ?? [],
          projeler: data.projeler ?? [],
          editorluk: data.editorluk ?? [],
          oduller: data.oduller ?? [],
          gorevler: data.gorevler ?? [],
          sanatFaaliyetleri: data.sanatFaaliyetleri ?? []
        });

      } catch (error) {
        console.error("CV verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvData();
  }, [kullaniciId]);
  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (!cvData) return <p className="text-center mt-10 text-red-500">Veri alınamadı.</p>;
  const handleDegerlendirmeKaydet = async () => {
    const juriId = localStorage.getItem("userId");

    if (!juriId || !kullaniciId || !rapor || !durum) {
      alert("Tüm alanları doldurun.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/juriDegerlendirme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          juriId: Number(juriId),
          adayId: Number(kullaniciId),
          rapor,
          durum, // Örn: "KABUL"
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Değerlendirme kaydedildi.");
      } else {
        alert(result.message || "Kayıt sırasında bir hata oluştu.");
      }
    } catch (err) {
      console.error("Sunucu hatası:", err);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div

      style={{
        backgroundImage: "url('/banner2.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Aday Özgeçmişi (CV)</h1>
        <div className=" mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">A. Makaleler</h2>

          {cvData.makaleler?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.makaleler.map((m: any, i: number) => (

              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"><strong>Yayın Adı:</strong> {m.yayinAdi}</p>
                <p className="text-sm text-gray-700">  <strong>Dergi:</strong> {m.dergiAdi}</p>
                <p className="text-sm text-gray-700"><strong>Cilt No:</strong> {m.ciltNo ?? "—"} | <strong>Sayfa No:</strong> {m.sayfaNo ?? "—"}</p>
                <p className="text-sm text-gray-700">  <strong>Yıl:</strong> {m.yil} | <strong>İndeks Türü:</strong> {m.indeksTuru}</p>
                <p className="text-sm text-gray-700">  <strong>Puan:</strong> {m.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">B. Bilimsel Toplantılar</h2>

          {cvData.toplantilar?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.toplantilar.map((t: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Bildirinin Adı:</strong> {t.bildiriAdi || "—"}</p>
                <p className="text-sm text-gray-700">  <strong>Konferans:</strong> {t.konferansAdi || "—"}</p>
                <p className="text-sm text-gray-700">  <strong>Etkinlik Türü:</strong> {t.etkinlikTuru}</p>
                <p className="text-sm text-gray-700">  <strong>Yer:</strong> {t.yer || "—"} | <strong>Tarih:</strong> {new Date(t.tarih).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">  <strong>Sayfa Sayısı:</strong> {t.sayfaSayisi ?? "—"} | <strong>Puan:</strong> {t.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">B. Kitaplar</h2>
          {cvData.kitaplar?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.kitaplar.map((k: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>

                <p className="text-sm text-gray-700"> <strong>Kitap Adı:</strong> {k.kitapAdi}</p>
                <p className="text-sm text-gray-700">  <strong>Yayınevi:</strong> {k.yayinevi} | <strong>Yayın Yeri:</strong> {k.yayinYeri ?? "—"}</p>
                <p className="text-sm text-gray-700">  <strong>Baskı Sayısı:</strong> {k.baskiSayisi} | <strong>Yıl:</strong> {k.yil}</p>
                <p className="text-sm text-gray-700">  <strong>Tür:</strong> {k.tur}</p>
                <p className="text-sm text-gray-700">  <strong>Puan:</strong> {k.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">C. Atıflar</h2>

          {cvData.atiflar?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.atiflar.map((a: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Atıf Yapan Eser:</strong> {a.atifYapanEser}</p>
                <p className="text-sm text-gray-700"> <strong>Atıf Sayısı:</strong> {a.atifSayisi}</p>
                <p className="text-sm text-gray-700"> <strong>İndeks:</strong> {a.indeks}</p>
                <p className="text-sm text-gray-700"> <strong>Puan:</strong> {a.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">D. Eğitim ve Öğretim Faaliyetleri</h2>

          {cvData.egitimOgretim?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.egitimOgretim.map((e: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Ders Adı:</strong> {e.dersAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Program:</strong> {e.programAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Ders Türü:</strong> {e.dersTuru}</p>
                <p className="text-sm text-gray-700"> <strong>Dönem:</strong> {e.dersDonemi} / {e.yil}</p>
                <p className="text-sm text-gray-700"> <strong>Puan:</strong> {e.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">E. Tez Danışmanlığı</h2>

          {cvData.tezler?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.tezler.map((tez: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Öğrenci:</strong> {tez.ogrenciAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Tez Adı:</strong> {tez.tezAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Enstitü:</strong> {tez.enstitu ?? "—"}</p>
                <p className="text-sm text-gray-700"> <strong>Yıl:</strong> {tez.yil} | <strong>Tür:</strong> {tez.tezTuru}</p>
                <p className="text-sm text-gray-700"> <strong>Puan:</strong> {tez.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">F. Patentler</h2>

          {cvData.patentler?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.patentler.map((patent: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Patent Adı:</strong> {patent.patentAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Tür:</strong> {patent.patentTuru}</p>
                <p className="text-sm text-gray-700"> <strong>Yıl:</strong> {patent.yil}</p>
                <p className="text-sm text-gray-700"> <strong>Puan:</strong> {patent.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">G. Araştırma Projeleri</h2>

          {cvData.projeler?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.projeler.map((proje: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Proje Adı:</strong> {proje.projeAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Tür:</strong> {proje.projeTuru} | <strong>Yıl:</strong> {proje.yil}</p>
                <p className="text-sm text-gray-700"> <strong>Süre:</strong> {proje.sure} ay | <strong>Bütçe:</strong> ₺{proje.butce}</p>
                <p className="text-sm text-gray-700"> <strong>Başlangıç:</strong> {new Date(proje.baslamaTarihi).toLocaleDateString()}
                  <p className="text-sm text-gray-700"></p> <strong>Bitiş:</strong> {new Date(proje.bitisTarihi).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">  <strong>Puan:</strong> {proje.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">H. Editörlük Faaliyetleri</h2>

          {cvData.editorluk?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.editorluk.map((edit: any, i: number) => (
              <div key={i} className="mb-2 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>Dergi:</strong> {edit.dergiAdi}</p>
                <p className="text-sm text-gray-700"> <strong>Görev:</strong> {edit.editTuru} | <strong>Yıl:</strong> {edit.yil}</p>
                <p className="text-sm text-gray-700"> <strong>Puan:</strong> {edit.puan ?? "—"}</p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">I. Ödüller</h2>

          {cvData.oduller?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.oduller.map((odul: any, i: number) => (
              <div key={i} className="mb-1 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>{odul.odulAdi}</strong> ({odul.odulTuru}, {odul.yil}) — Puan: {odul.puan ?? "—"}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">J. İdari/Akademik Görevler</h2>

          {cvData.gorevler?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.gorevler.map((gorev: any, i: number) => (
              <div key={i} className="mb-1 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700">
                  - <strong>{gorev.gorevAdi}</strong> ({gorev.gorevTuru})<br />
                  Süre: {gorev.sure} ay — {new Date(gorev.baslamaTarihi).toLocaleDateString()} - {new Date(gorev.bitisTarihi).toLocaleDateString()}<br />
                  Puan: {gorev.puan ?? "—"}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="mb-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800">K. Güzel Sanatlar Faaliyetleri</h2>

          {cvData.sanatFaaliyetleri?.length === 0 ? (
            <p className="text-gray-600 text-sm">Veri bulunmamaktadır.</p>
          ) : (
            cvData.sanatFaaliyetleri.map((faaliyet: any, i: number) => (
              <div key={i} className="mb-1 text-sm text-gray-700">
                <br></br><hr></hr><br></br>
                <p className="text-sm text-gray-700"> <strong>{faaliyet.faaliyetAdi}</strong> ({faaliyet.faaliyetTuru}, {faaliyet.yil}) — Puan: {faaliyet.puan ?? "—"}
                </p>
              </div>
            ))
          )}
        </div>


        < div className="mt-10 text-center" >
          <PDFDownloadLink
            document={<CVPdf data={cvData} />}
            fileName={`aday_cv_${kullaniciId}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <span>PDF hazırlanıyor...</span>
              ) : (
                <Button className="bg-blue-600 text-white">PDF Olarak İndir</Button>
              )
            }
          </PDFDownloadLink>
        </div >
      </div >

      <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Değerlendirme Alanı</h2>

        <textarea
          value={rapor}
          onChange={(e) => setRapor(e.target.value)}
          placeholder="Aday hakkında değerlendirme raporunuzu yazın..."
          className="w-full border rounded p-3 mb-4 text-sm text-gray-700"
          rows={6}
        />

        <select
          value={durum}
          onChange={(e) => setDurum(e.target.value)}
          className="w-full border rounded p-2 mb-4 text-sm text-gray-700"
        >
          <option value="">Durum Seçin</option>
          <option value="ONAYLANDI">Onaylandı</option>
          <option value="REDDEDILDI">Reddedildi</option>
        </select>

        <Button onClick={handleDegerlendirmeKaydet} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Değerlendirmeyi Kaydet
        </Button>
      </div>
      <br></br><br></br>
    </div >
  );
}
