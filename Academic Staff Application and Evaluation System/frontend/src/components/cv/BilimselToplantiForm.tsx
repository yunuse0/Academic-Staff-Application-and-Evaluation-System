import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ToplantiFormProps {
  onSave: (data: any) => void;
}

const toplantiPuanlari: { [key: string]: number } = {
  "ULUSLARARASI_TAM_METIN_SUNUM": 8,
  "ULUSLARARASI_OZET_SUNUM": 7,
  "ULUSLARARASI_POSTER": 6,
  "ULUSAL_TAM_METIN_SUNUM": 7,
  "ULUSAL_OZET_SUNUM": 6,
  "ULUSAL_POSTER": 5,
  "ULUSLARARASI_KURUL_UYELIGI": 7,
  "ULUSAL_KURUL_UYELIGI": 5,
  "ULUSLARARASI_DAVETLI_KONUSMACI": 8,
  "ULUSAL_DAVETLI_KONUSMACI": 6,
  "ATOLYE_ORGANIZASYON": 6,
  "ATOLYE_KONUSMACI": 5,
};

const etkinlikTuruOptions = [
  { value: "ULUSLARARASI_TAM_METIN_SUNUM", label: "Uluslararası Tam Metin Sunum" },
  { value: "ULUSLARARASI_OZET_SUNUM", label: "Uluslararası Özet Sunum" },
  { value: "ULUSLARARASI_POSTER", label: "Uluslararası Poster" },
  { value: "ULUSAL_TAM_METIN_SUNUM", label: "Ulusal Tam Metin Sunum" },
  { value: "ULUSAL_OZET_SUNUM", label: "Ulusal Özet Sunum" },
  { value: "ULUSAL_POSTER", label: "Ulusal Poster" },
  { value: "ULUSLARARASI_KURUL_UYELIGI", label: "Uluslararası Kurul Üyeliği" },
  { value: "ULUSAL_KURUL_UYELIGI", label: "Ulusal Kurul Üyeliği" },
  { value: "ULUSLARARASI_DAVETLI_KONUSMACI", label: "Uluslararası Davetli Konuşmacı" },
  { value: "ULUSAL_DAVETLI_KONUSMACI", label: "Ulusal Davetli Konuşmacı" },
  { value: "ATOLYE_ORGANIZASYON", label: "Atölye Organizasyonu" },
  { value: "ATOLYE_KONUSMACI", label: "Atölye Konuşmacısı" }
];

const ToplantiForm: React.FC<ToplantiFormProps> = ({ onSave }) => {
  const [form, setForm] = useState({
    adSoyad: "",
    konferansAdi: "",
    tarih: "",
    yer: "",
    tur: "",
    sayfaSayisi: "",
    puan: 0,  
  });

  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setKullaniciId(parseInt(userId));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID'si bulunamadı.");
      return;
    }

    const puan = toplantiPuanlari[form.tur] || 0;

    const payload = {
      kullaniciId,
      konferansAdi: form.konferansAdi,
      bildiriAdi: form.adSoyad,  // bildiriAdi burada kullanılıyor
      etkinlikTuru: form.tur,  // enum değerinin gönderilmesi
      sayfaSayisi: form.sayfaSayisi ? parseInt(form.sayfaSayisi) : 0,  // sayfaSayisi varsa int'e çevriliyor
      tarih: form.tarih,
      yer: form.yer,
      puan, // Hesaplanan puan payload'a ekleniyor
    };

    try {
      const res = await fetch("http://localhost:3001/api/toplantiEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Sunucu Hatası:", errorData);
        alert(`Kayıt sırasında hata oluştu: ${errorData.message || 'Bilinmeyen hata'}`);
        return;
      }

      const result = await res.json();
      onSave(result);
    } catch (err) {
      alert("Kayıt sırasında beklenmeyen bir hata oluştu.");
      console.error("Hata:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold text-center">Bilimsel Toplantı Ekle</h2>

      <input
        name="adSoyad"
        value={form.adSoyad}
        onChange={handleChange}
        placeholder="Ad Soyad"
        className="border p-2 rounded"
        required
      />
      <input
        name="konferansAdi"
        value={form.konferansAdi}
        onChange={handleChange}
        placeholder="Konferans Adı"
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        name="tarih"
        value={form.tarih}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="yer"
        value={form.yer}
        onChange={handleChange}
        placeholder="Yer"
        className="border p-2 rounded"
        required
      />
      
      <label className="font-semibold">Toplantı Türü</label>
      <select
        name="tur"
        value={form.tur}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Seçiniz</option>
        {etkinlikTuruOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {form.tur && (
        <div className="text-right text-sm text-gray-600">
          Hesaplanan puan: <strong>{toplantiPuanlari[form.tur]}</strong>
        </div>
      )}

      <input
        type="number"
        name="sayfaSayisi"
        value={form.sayfaSayisi}
        onChange={handleChange}
        placeholder="Sayfa Sayısı (Opsiyonel)"
        className="border p-2 rounded"
      />

      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default ToplantiForm;
