import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const patentTuruListesi = [
  { value: "ULUSLARARASI_LISANSLANAN_PATENT", label: "Uluslararası Lisanslanan Patent", puan: 120 },
  { value: "ULUSLARARASI_TESCILLENMIS_PATENT", label: "Uluslararası Tescillenmiş Patent", puan: 100 },
  { value: "ULUSLARARASI_PATENT_BASVURUSU", label: "Uluslararası Patent Başvurusu", puan: 50 },
  { value: "ULUSAL_LISANSLANAN_PATENT", label: "Ulusal Lisanslanan Patent", puan: 80 },
  { value: "ULUSAL_TESCILLENMIS_PATENT", label: "Ulusal Tescillenmiş Patent", puan: 60 },
  { value: "ULUSAL_PATENT_BASVURUSU", label: "Ulusal Patent Başvurusu", puan: 30 },
  { value: "LISANSLANAN_FAYDALI_MODEL_ENDUSTRIEL_TASARIM_MARKA", label: "Lisanslanan Faydalı Model/Endüstriyel Tasarım/Marka", puan: 20 },
  { value: "FAYDALI_MODEL_ENDUSTRIEL_TASARIM", label: "Faydalı Model/Endüstriyel Tasarım", puan: 15 },
];

interface PatentFormProps {
  onSave: (data: any) => void;
}

const PatentForm: React.FC<PatentFormProps> = ({ onSave }) => {
  const [patentAdi, setPatentAdi] = useState("");
  const [patentTuru, setPatentTuru] = useState("ULUSLARARASI_LISANSLANAN_PATENT");
  const [yil, setYil] = useState("");
  const [puan, setPuan] = useState(100);
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setPatentTuru(selected);
    const kategori = patentTuruListesi.find(p => p.value === selected);
    setPuan(kategori?.puan || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const data = {
      kullaniciId,
      patentAdi,
      patentTuru,
      yil: parseInt(yil),
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/patentEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Patent faaliyeti kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Patent faaliyeti hatası:", err);
      alert("Patent faaliyeti kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Patent Faaliyeti</h2>

      <input
        type="text"
        placeholder="Patent Adı"
        value={patentAdi}
        onChange={(e) => setPatentAdi(e.target.value)}
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

      <label htmlFor="tur" className="block font-semibold mt-4">Patent Türü</label>
      <select
        id="tur"
        value={patentTuru}
        onChange={handleTuruChange}
        className="border p-2 rounded w-full mt-2"
        required
      >
        {patentTuruListesi.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <div className="text-right text-sm text-gray-600">
        <strong>Hesaplanan Puan: {puan}</strong>
      </div>

      <div className="mt-4 flex justify-center">
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default PatentForm;
