import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const odulTuruListesi = [
  { value: "JURILI_ULUSLARARASI", label: "Jürili Uluslararası", puan: 120 },
  { value: "TUBITAK_BILIM_OZEL_HIZMET", label: "TÜBİTAK Bilim Özel Hizmet", puan: 100 },
  { value: "TUBA_AKADEMI_ODUL", label: "TÜBA Akademi Ödülü", puan: 80 },
  { value: "TUBITAK_TESIK", label: "TÜBİTAK Teşvik", puan: 70 },
  { value: "TUBA_GEBIP_TESEP", label: "TÜBA GEBİP-TESEP", puan: 90 },
  { value: "JURILI_ULUSAL", label: "Jürili Ulusal", puan: 60 },
  { value: "JURI_DEGIL", label: "Jüri Değil", puan: 30 },
  { value: "INTERNATIONAL_YARISMA_BIRINCI", label: "International Yarışma Birinci", puan: 150 },
  { value: "NATIONAL_YARISMA_BIRINCI", label: "National Yarışma Birinci", puan: 100 },
  { value: "INTERNATIONAL_SANAT_ODUL", label: "International Sanat Ödülü", puan: 140 },
  { value: "NATIONAL_SANAT_ODUL", label: "National Sanat Ödülü", puan: 110 },
];

interface OdulFormProps {
  onSave: (data: any) => void;
}

const OdulForm: React.FC<OdulFormProps> = ({ onSave }) => {
  const [odulAdi, setOdulAdi] = useState("");
  const [odulTuru, setOdulTuru] = useState("JURILI_ULUSLARARASI");
  const [yil, setYil] = useState("");
  const [puan, setPuan] = useState(120);
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setOdulTuru(selected);
    const kategori = odulTuruListesi.find(p => p.value === selected);
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
      odulAdi,
      odulTuru,
      yil: parseInt(yil),
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/odulEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Ödül faaliyeti kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Ödül faaliyeti hatası:", err);
      alert("Ödül faaliyeti kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Ödül Faaliyeti</h2>

      {/* Ödül Adı */}
      <div className="flex flex-col gap-2">
        <label htmlFor="odulAdi" className="font-medium text-gray-700">Ödül Adı</label>
        <input
          id="odulAdi"
          type="text"
          placeholder="Ödül Adı"
          value={odulAdi}
          onChange={(e) => setOdulAdi(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Yıl */}
      <div className="flex flex-col gap-2">
        <label htmlFor="yil" className="font-medium text-gray-700">Yıl</label>
        <input
          id="yil"
          type="number"
          placeholder="Yıl"
          value={yil}
          onChange={(e) => setYil(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Ödül Türü */}
      <div className="flex flex-col gap-2">
        <label htmlFor="odulTuru" className="font-medium text-gray-700">Ödül Türü</label>
        <select
          id="odulTuru"
          value={odulTuru}
          onChange={handleTuruChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          {odulTuruListesi.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Puan Gösterimi */}
      <div className="text-right text-sm text-gray-600 mt-2">
        <strong>Hesaplanan Puan: {puan}</strong>
      </div>

      {/* Kaydet Butonu */}
      <div className="mt-6 flex justify-center">
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300">
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default OdulForm;
