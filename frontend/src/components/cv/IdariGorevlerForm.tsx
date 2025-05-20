import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const gorevTuruListesi = [
    { value: "I1", label: "Dekan/Enstitü/Yüksekokul/MYO/Merkez Müdürü", puan: 100 },
    { value: "I2", label: "Enstitü Müdür Yrd. / Dekan Yrd. / Yüksekokul Müdür Yrd. / MYO Müdür Yrd. / Merkez Müdürü Yrd. / Bölüm Başkanı", puan: 90 },
    { value: "I3", label: "Bölüm Başkan Yrd. / Anabilim Dalı Başkanı", puan: 85 },
    { value: "I4", label: "Rektörlükçe Görevlendirilen Koordinatörlük", puan: 80 },
    { value: "I5", label: "Rektörlükçe Görevlendirilen Koordinatör Yardımcıları", puan: 75 },
    { value: "I6", label: "Rektörlükçe Görevlendirilen Üniversite Düzeyinde Komisyon/Kurul Üyelikleri", puan: 70 },
    { value: "I7", label: "Dekanlık/Y.O. Müdürlüğü/MYO Müdürlüğü/Konservatuvar Müdürlüğü Tarafından Görevlendirilen Komisyon/Kurul Üyelikleri", puan: 65 },
    { value: "I8", label: "Bölüm Başkanlıkları Tarafından Görevlendirilen Komisyon/Kurul Üyelikleri", puan: 60 },
    { value: "I9", label: "Rektörlük/Dekanlık/... Görevlendirmeleriyle Kurum İçi ve Dışı Eğitim, İşbirliği vb. Konularda Katkı Sağlamak", puan: 55 },
    { value: "I10", label: "Uluslararası Bilimsel ve Mesleki Kurum/Kuruluş Yönetimi veya Kurulları", puan: 50 },
    { value: "I11", label: "Ulusal Bilimsel ve Mesleki Kurum/Kuruluş Yönetimi veya Kurulları", puan: 45 },
    { value: "I12", label: "Yerel Bilimsel ve Mesleki Kurum/Kuruluş Yönetimi veya Kurulları", puan: 40 },
  ];
  

interface GorevFormProps {
  onSave: (data: any) => void;
}

const GorevForm: React.FC<GorevFormProps> = ({ onSave }) => {
  const [gorevAdi, setGorevAdi] = useState("");
  const [gorevTuru, setGorevTuru] = useState("I1");
  const [baslamaTarihi, setBaslamaTarihi] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState("");
  const [sure, setSure] = useState(0);
  const [puan, setPuan] = useState(100);
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleGorevTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setGorevTuru(selected);
    const selectedTur = gorevTuruListesi.find((t) => t.value === selected);
    setPuan(selectedTur?.puan || 0);
  };

  const calculateSure = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const calculatedSure = calculateSure(baslamaTarihi, bitisTarihi);

    const data = {
      kullaniciId,
      gorevAdi,
      gorevTuru,
      baslamaTarihi,
      bitisTarihi,
      sure: calculatedSure,
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/gorevEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("İdari görev kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Görev ekleme hatası:", err);
      alert("Görev kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">İdari Görev Ekle</h2>

      <input
        type="text"
        placeholder="Görev Adı"
        value={gorevAdi}
        onChange={(e) => setGorevAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <div className="flex flex-col">
        <label htmlFor="baslamaTarihi" className="text-sm font-semibold">Başlama Tarihi</label>
        <input
          id="baslamaTarihi"
          type="date"
          value={baslamaTarihi}
          onChange={(e) => setBaslamaTarihi(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="bitisTarihi" className="text-sm font-semibold">Bitiş Tarihi</label>
        <input
          id="bitisTarihi"
          type="date"
          value={bitisTarihi}
          onChange={(e) => setBitisTarihi(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="gorevTuru" className="text-sm font-semibold">Görev Türü</label>
        <select
          id="gorevTuru"
          value={gorevTuru}
          onChange={handleGorevTuruChange}
          className="border p-2 rounded"
          required
        >
          {gorevTuruListesi.map((tur) => (
            <option key={tur.value} value={tur.value}>
              {tur.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right text-sm text-gray-600">
        <strong>Hesaplanan Puan: {puan}</strong>
      </div>

      <div className="mt-4 flex justify-center">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded">
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default GorevForm;