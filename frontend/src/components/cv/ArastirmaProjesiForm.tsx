import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const projeTuruListesi = [
    { value: "P1", label: "AB Çerçeve Programı/NSF/ERC Koordinatör/Alt Koordinatör", puan: 40 },
    { value: "P2", label: "AB Çerçeve Programı/NSF/ERC Yürütücü", puan: 35 },
    { value: "P3", label: "TÜBİTAK ARGE/TÜSEB Projesi Yürütücüsü", puan: 30 },
    { value: "P4", label: "BAP Projesi Yürütücüsü", puan: 20 },
    { value: "P5", label: "4+ Ay Yurtdışı Araştırma", puan: 15 },
    { value: "P6", label: "TÜBİTAK 2209/2242 Danışmanı", puan: 10 },
    { value: "P7", label: "Kalkınma Ajansı/Dış Fon Projesi Yürütücüsü", puan: 25 },
    { value: "P8", label: "Kalkınma Ajansı/Dış Fon Projesi Araştırmacı", puan: 15 },
    { value: "P9", label: "TÜBİTAK Projesi Araştırmacı", puan: 20 },
    { value: "P10", label: "BAP Araştırmacı", puan: 10 },
    { value: "P11", label: "Patent Başvurusu (ulusal)", puan: 20 },
    { value: "P12", label: "Patent Başvurusu (uluslararası)", puan: 25 },
    { value: "P13", label: "Tescillenmiş Patent (ulusal)", puan: 30 },
    { value: "P14", label: "Tescillenmiş Patent (uluslararası)", puan: 35 },
    { value: "P15", label: "Teknoloji Transferi Lisans Geliri", puan: 40 },
    { value: "P16", label: "Ulusal Yenilik Yarışması Birincilik", puan: 15 },
    { value: "P17", label: "Ulusal Yenilik Yarışması İkincilik/Üçüncülük", puan: 10 },
    { value: "P18", label: "Uluslararası Yenilik Yarışması Birincilik", puan: 20 },
    { value: "P19", label: "Uluslararası Yenilik Yarışması İkincilik/Üçüncülük", puan: 15 },
    { value: "P20", label: "Start-Up Kuruculuğu", puan: 25 },
    { value: "P21", label: "Start-Up'da Aktif Girişimcilik (mentörlük/danışmanlık)", puan: 15 },
    { value: "P22", label: "Sanayi ile Ortak Proje Yürütücülüğü", puan: 25 },
    { value: "P23", label: "Sanayi ile Ortak Proje Araştırmacılığı", puan: 15 },
    { value: "P24", label: "TÜBİTAK Sanayi Doktora Danışmanlığı", puan: 20 },
    { value: "P25", label: "Ulusal Akreditasyon Belgesi (LAB/ÜR-GE)", puan: 10 },
    { value: "P26", label: "Uluslararası Akreditasyon Belgesi (LAB/ÜR-GE)", puan: 15 },
    { value: "P27", label: "Yurt Dışı Bilimsel Kuruluş Temsilciliği", puan: 20 },
    { value: "P28", label: "Yurt İçi Bilimsel Kuruluş Temsilciliği", puan: 10 },
  ];
  

interface ArastirmaFormProps {
  onSave: (data: any) => void;
}

const ArastirmaForm: React.FC<ArastirmaFormProps> = ({ onSave }) => {
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);
  const [projeAdi, setProjeAdi] = useState("");
  const [projeTuru, setProjeTuru] = useState("AB_CERCEVE_KOORDINATOR");
  const [yil, setYil] = useState("");
  const [baslamaTarihi, setBaslamaTarihi] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState("");
  const [sure, setSure] = useState("");
  const [butce, setButce] = useState("");
  const [puan, setPuan] = useState(40);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleProjeTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setProjeTuru(selected);
    const found = projeTuruListesi.find((p) => p.value === selected);
    setPuan(found?.puan || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const data = {
      kullaniciId,
      projeAdi,
      projeTuru,
      yil: parseInt(yil),
      baslamaTarihi,
      bitisTarihi,
      sure: parseInt(sure),
      butce: parseFloat(butce),
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/projeEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Araştırma projesi kaydedildi:", result);
      onSave(result);
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("Araştırma projesi kaydedilemedi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center">Araştırma Projesi Ekle</h2>

      <input
        type="text"
        placeholder="Proje Adı"
        value={projeAdi}
        onChange={(e) => setProjeAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Yıl"
        value={yil}
        onChange={(e) => setYil(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <label htmlFor="projeTuru" className="font-semibold">Proje Türü</label>
      <select
        id="projeTuru"
        value={projeTuru}
        onChange={handleProjeTuruChange}
        className="border p-2 rounded"
        required
      >
        {projeTuruListesi.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <input
        type="date"
        placeholder="Başlama Tarihi"
        value={baslamaTarihi}
        onChange={(e) => setBaslamaTarihi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="date"
        placeholder="Bitiş Tarihi"
        value={bitisTarihi}
        onChange={(e) => setBitisTarihi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Süre (Ay)"
        value={sure}
        onChange={(e) => setSure(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Bütçe (₺)"
        value={butce}
        onChange={(e) => setButce(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <div className="text-right text-sm text-gray-600">
        <strong>Hesaplanan Puan: {puan}</strong>
      </div>

      <div className="mt-4 flex justify-center">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default ArastirmaForm;
