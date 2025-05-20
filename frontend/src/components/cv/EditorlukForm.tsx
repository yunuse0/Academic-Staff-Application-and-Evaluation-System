import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const editTuruListesi = [
  { value: "E1", label: "Hakem", puan: 10 },
  { value: "E2", label: "Editör", puan: 20 },
  { value: "E3", label: "Yazar", puan: 15 },
  { value: "E4", label: "Danışman", puan: 25 },
  { value: "E5", label: "Baş Editör", puan: 30 },
  { value: "E6", label: "Kıdemli Hakem", puan: 40 },
  { value: "E7", label: "Kıdemli Editör", puan: 35 },
  { value: "E8", label: "Danışma Kurulu Üyesi", puan: 50 },
  { value: "E9", label: "Dergi Yöneticisi", puan: 45 },
  { value: "E10", label: "Başhakem", puan: 60 },
  { value: "E11", label: "Hakem Takım Lideri", puan: 55 },
  { value: "E12", label: "Ödüllü Editör", puan: 70 },
  { value: "E13", label: "Dergi Danışmanı", puan: 65 },
];

interface EditorlukFormProps {
  onSave: (data: any) => void;
}

const EditorlukForm: React.FC<EditorlukFormProps> = ({ onSave }) => {
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);
  const [dergiAdi, setDergiAdi] = useState("");
  const [editTuru, setEditTuru] = useState("E1");
  const [yil, setYil] = useState("");
  const [puan, setPuan] = useState(10); 

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleEditTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setEditTuru(selected);
    const selectedEditTuru = editTuruListesi.find((e) => e.value === selected);
    setPuan(selectedEditTuru?.puan || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const data = {
      kullaniciId,
      dergiAdi,
      editTuru,
      yil: parseInt(yil),
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/hakemEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Editörlük faaliyeti kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Editörlük faaliyeti kaydı hatası:", err);
      alert("Editörlük faaliyeti kaydedilemedi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center">Editörlük Faaliyeti</h2>

      <input
        type="text"
        placeholder="Dergi Adı"
        value={dergiAdi}
        onChange={(e) => setDergiAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <label htmlFor="editTuru" className="block font-semibold mt-4">Editörlük Türü</label>
      <select
        id="editTuru"
        value={editTuru}
        onChange={handleEditTuruChange}
        className="border p-2 rounded w-full mt-2"
        required
      >
        {editTuruListesi.map((turu) => (
          <option key={turu.value} value={turu.value}>
            {turu.label}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Yıl"
        value={yil}
        onChange={(e) => setYil(e.target.value)}
        className="border p-2 rounded"
        required
      />

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

export default EditorlukForm;
