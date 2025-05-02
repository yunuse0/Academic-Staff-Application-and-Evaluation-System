import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface KitapFormProps {
  onSave: (data: any) => void;
}

const kitapPuanlari: { [key: string]: number } = {
  "ULUSLARARASI_OZGUN_KITAP": 60,
  "ULUSLARARASI_BOLUM_YAZARLIGI": 20,
  "ULUSLARARASI_ANSIKLOPEDI": 5,
  "ULUSAL_OZGUN_KITAP": 40,
  "ULUSAL_BOLUM_YAZARLIGI": 10,
  "TAM_KITAP_CEVIRISI": 15,
  "CEVIRI_BOLUM_YAZARLIGI": 6,
  "ULUSAL_ANSIKLOPEDI": 3,
};

const KitapForm: React.FC<KitapFormProps> = ({ onSave }) => {
  const [kitap, setKitap] = useState({
    yazarAdi: "",
    kitapAdi: "",
    yayinevi: "",
    baskiSayisi: "",
    yayinYeri: "",
    yil: "",
    tur: "",
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
    setKitap((prev) => ({
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

    const puan = kitapPuanlari[kitap.tur] || 0;

    const payload = {
      kullaniciId,
      kitapAdi: kitap.kitapAdi,
      yayinevi: kitap.yayinevi,
      baskiSayisi: parseInt(kitap.baskiSayisi),
      yayinYeri: kitap.yayinYeri,
      yil: parseInt(kitap.yil),
      tur: kitap.tur,
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/kitapEkle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sunucu hatası");
      }

      const result = await response.json();
      console.log("Kitap başarıyla kaydedildi:", result);
      onSave(result);
    } catch (error) {
      console.error("Kitap gönderilirken hata oluştu:", error);
      alert("Kitap kaydedilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Kitap Bilgileri</h2>

      <input
        type="text"
        name="yazarAdi"
        placeholder="Yazar Adı"
        value={kitap.yazarAdi}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="kitapAdi"
        placeholder="Kitap Adı"
        value={kitap.kitapAdi}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="yayinevi"
        placeholder="Yayınevi"
        value={kitap.yayinevi}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="baskiSayisi"
        placeholder="Baskı Sayısı"
        value={kitap.baskiSayisi}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="yayinYeri"
        placeholder="Yayımlandığı Yer"
        value={kitap.yayinYeri}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="yil"
        placeholder="Yıl"
        value={kitap.yil}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <label className="font-semibold mt-2">Kitap Türü</label>
      <select
        name="tur"
        value={kitap.tur}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Tür Seçiniz</option>
        <option value="ULUSLARARASI_OZGUN_KITAP">Uluslararası özgün kitap</option>
        <option value="ULUSLARARASI_BOLUM_YAZARLIGI">Uluslararası kitap bölüm yazarlığı/editörlüğü</option>
        <option value="ULUSLARARASI_ANSIKLOPEDI">Uluslararası ansiklopedi maddesi</option>
        <option value="ULUSAL_OZGUN_KITAP">Ulusal özgün kitap</option>
        <option value="ULUSAL_BOLUM_YAZARLIGI">Ulusal kitap bölüm yazarlığı/editörlüğü</option>
        <option value="TAM_KITAP_CEVIRISI">Tam kitap çevirisi</option>
        <option value="CEVIRI_BOLUM_YAZARLIGI">Kitap bölümü çevirisi/editörlüğü</option>
        <option value="ULUSAL_ANSIKLOPEDI">Ulusal ansiklopedi maddesi</option>
      </select>

      {kitap.tur && (
        <div className="text-right text-sm text-gray-600">
          Hesaplanan puan: <strong>{kitapPuanlari[kitap.tur]}</strong>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Kaydet
        </Button>
      </div>
    </form>
  );
};

export default KitapForm;
