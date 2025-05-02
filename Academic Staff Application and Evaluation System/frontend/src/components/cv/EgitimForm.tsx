import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const kategoriListesi = [
  { value: "ONLISANS_LISANS", label: "Önlisans / Lisans Dersleri", puan: 2 },
  { value: "ONLISANS_LISANS_YD", label: "Önlisans / Lisans Dersleri (Yabancı dilde)", puan: 3 },
  { value: "LISANSUSTU", label: "Lisansüstü Dersleri", puan: 3 },
  { value: "LISANSUSTU_YD", label: "Lisansüstü Dersleri (Yabancı dilde)", puan: 4 },
];

const donemListesi = [
  { value: "BAHAR", label: "Bahar" },
  { value: "GUZ", label: "Güz" },
];

interface EgitimFormProps {
  onSave: (data: any) => void;
}

const EgitimForm: React.FC<EgitimFormProps> = ({ onSave }) => {
  const [dersAdi, setDersAdi] = useState("");
  const [programAdi, setProgramAdi] = useState("");
  const [donem, setDonem] = useState("BAHAR");
  const [yil, setYil] = useState("");
  const [kategori, setKategori] = useState("ONLISANS_LISANS");
  const [puan, setPuan] = useState(50); // default kategoriye göre
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setKategori(selected);
    const selectedKategori = kategoriListesi.find((k) => k.value === selected);
    setPuan(selectedKategori?.puan || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const data = {
      kullaniciId,
      dersAdi,
      programAdi,
      dersTuru: kategori,
      dersDonemi: donem,
      yil: parseInt(yil),
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/faaliyetEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Eğitim faaliyeti kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Eğitim faaliyeti kaydı hatası:", err);
      alert("Eğitim faaliyeti kaydedilemedi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center">Eğitim Öğretim Faaliyeti</h2>

      <input
        type="text"
        placeholder="Dersin Adı"
        value={dersAdi}
        onChange={(e) => setDersAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Programın Adı"
        value={programAdi}
        onChange={(e) => setProgramAdi(e.target.value)}
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

      <label htmlFor="kategori" className="block font-semibold mt-4">Kategori Seçiniz</label>
      <select
        id="kategori"
        value={kategori}
        onChange={handleKategoriChange}
        className="border p-2 rounded w-full mt-2"
        required
      >
        {kategoriListesi.map((k) => (
          <option key={k.value} value={k.value}>{k.label}</option>
        ))}
      </select>

      <label htmlFor="donem" className="block font-semibold mt-4">Dönemi Seçiniz</label>
      <select
        id="donem"
        value={donem}
        onChange={(e) => setDonem(e.target.value)}
        className="border p-2 rounded w-full mt-2"
        required
      >
        {donemListesi.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
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

export default EgitimForm;
