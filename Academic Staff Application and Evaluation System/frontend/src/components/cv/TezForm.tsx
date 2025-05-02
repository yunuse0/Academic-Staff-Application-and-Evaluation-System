import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const tezTuruListesi = [
  { value: "DOKTORA_SANATTA_YETERLIK_UZMANLIK", label: "Doktora / Sanatta Yeterlik / Uzmanlık", puan: 100 },
  { value: "YUKSEK_LISANS_TEZ_YONETIMI", label: "Yüksek Lisans Tez Yönetimi", puan: 80 },
  { value: "DOKTORA_SANATTA_YETERLIK_ES_DANISMAN", label: "Doktora / Sanatta Yeterlik (Eş Danışman)", puan: 50 },
  { value: "YUKSEK_LISANS_SANATTA_ES_DANISMAN", label: "Yüksek Lisans / Sanatta Eş Danışman", puan: 40 },
];

interface TezFormProps {
  onSave: (data: any) => void;
}

const TezForm: React.FC<TezFormProps> = ({ onSave }) => {
  const [ogrenciAdi, setOgrenciAdi] = useState("");
  const [tezAdi, setTezAdi] = useState("");
  const [enstitu, setEnstitu] = useState("");
  const [yil, setYil] = useState("");
  const [tezTuru, setTezTuru] = useState("DOKTORA_SANATTA_YETERLIK_UZMANLIK");
  const [puan, setPuan] = useState(100);
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleTezTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setTezTuru(selected);
    const bulunan = tezTuruListesi.find((t) => t.value === selected);
    setPuan(bulunan?.puan || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const data = {
      kullaniciId,
      ogrenciAdi,
      tezAdi,
      enstitu: enstitu || undefined,
      yil: parseInt(yil),
      tezTuru,
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/tezEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Tez yöneticiliği kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Tez yöneticiliği hatası:", err);
      alert("Tez yöneticiliği kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Tez Yöneticiliği</h2>

      <input
        type="text"
        placeholder="Öğrencinin Adı"
        value={ogrenciAdi}
        onChange={(e) => setOgrenciAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Tez Başlığı"
        value={tezAdi}
        onChange={(e) => setTezAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Enstitü (opsiyonel)"
        value={enstitu}
        onChange={(e) => setEnstitu(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Yıl"
        value={yil}
        onChange={(e) => setYil(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <label htmlFor="tezTuru" className="block font-semibold mt-4">Tez Türü</label>
      <select
        id="tezTuru"
        value={tezTuru}
        onChange={handleTezTuruChange}
        className="border p-2 rounded w-full mt-2"
        required
      >
        {tezTuruListesi.map((t) => (
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

export default TezForm;
