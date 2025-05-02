import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Kategori etiketinden enum değerlerine eşleme
const indeksMap: { [key: string]: 
  "SSCI_Q1" | "SSCI_Q2" | "SSCI_Q3" | "SSCI_Q4" | "ESCI" | "SCOPUS" | "DIGER_ULUSLARARASI" | "ULAKBIM" | "DIGER_ULUSAL"
} = {
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q1 olarak taranan dergide)": "SSCI_Q1",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)": "SSCI_Q2",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide)": "SSCI_Q3",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)": "SSCI_Q4",
  "ESCI tarafından taranan dergilerde yayımlanmış makale": "ESCI",
  "Scopus tarafından taranan dergilerde yayımlanmış makale": "SCOPUS",
  "Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale": "DIGER_ULUSLARARASI",
  "ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale": "ULAKBIM",
  "8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale": "DIGER_ULUSAL",
};

// Her indekse karşılık gelen puan
const indeksPuanlari = {
  SSCI_Q1: 60,
  SSCI_Q2: 55,
  SSCI_Q3: 40,
  SSCI_Q4: 30,
  ESCI: 25,
  SCOPUS: 20,
  DIGER_ULUSLARARASI: 15,
  ULAKBIM: 10,
  DIGER_ULUSAL: 8,
} as const;

const makaleKategorileri = Object.keys(indeksMap);

interface MakaleFormProps {
  onSave: (data: any) => void;
}

export default function MakaleForm({ onSave }: MakaleFormProps) {
  const [makale, setMakale] = useState({
    makaleAdi: "",
    dergiAdi: "",
    ciltNo: "",
    sayfaSayisi: "",
    yil: "",
    kategori: makaleKategorileri[0],
  });

  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setKullaniciId(parseInt(userId));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMakale((prev) => ({
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

    const indeksKey = indeksMap[makale.kategori];
    const puan = indeksPuanlari[indeksKey];

    const payload = {
      kullaniciId,
      yayinAdi: makale.makaleAdi,
      dergiAdi: makale.dergiAdi,
      ciltNo: makale.ciltNo || null,
      sayfaNo: makale.sayfaSayisi || null,
      yil: parseInt(makale.yil),
      indeksTuru: indeksKey,
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/makaleEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sunucu hatası");
      }

      const result = await response.json();
      console.log("Makale başarıyla kaydedildi:", result);
      onSave(result);
    } catch (error) {
      console.error("Makale gönderilirken hata oluştu:", error);
      alert("Makale kaydedilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Makale Bilgileri</h2>

      <input
        type="text"
        name="makaleAdi"
        placeholder="Makale Adı"
        value={makale.makaleAdi}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        name="dergiAdi"
        placeholder="Dergi Adı"
        value={makale.dergiAdi}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        name="ciltNo"
        placeholder="Cilt No"
        value={makale.ciltNo}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="sayfaSayisi"
        placeholder="Sayfa Sayısı"
        value={makale.sayfaSayisi}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="yil"
        placeholder="Yıl"
        value={makale.yil}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <select
        name="kategori"
        value={makale.kategori}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        {makaleKategorileri.map((kategori, index) => (
          <option key={index} value={kategori}>
            {kategori}
          </option>
        ))}
      </select>

      <div className="text-right text-sm text-gray-600">
        Hesaplanan puan: <strong>{indeksPuanlari[indeksMap[makale.kategori]]}</strong>
      </div>

      <Button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
        Kaydet
      </Button>
    </form>
  );
}
