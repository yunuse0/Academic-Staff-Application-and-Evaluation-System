import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AtifFormProps {
  onSave: (data: any) => void;
}

const atifEnumDegerleri = [
  { label: "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale", value: "SCI_E_SSCI_AHCI" },
  { label: "ESCI tarafından taranan dergilerde yayımlanmış makale", value: "E_SCI" },
  { label: "Scopus veya diğer uluslararası indekslerde taranan dergilerde yayımlanmış makale", value: "ULUSLARARASI" },
  { label: "ULAKBİM TR Dizin veya diğer ulusal hakemli dergilerde yayımlanmış makale", value: "ULUSAL" },
  { label: "Güzel Sanatlar alanında uluslararası dergilerde yayımlanmış makale", value: "GUZEL_SANATLAR_ULUSLARARASI" },
  { label: "Güzel Sanatlar alanında ulusal dergilerde yayımlanmış makale", value: "GUZEL_SANATLAR_ULUSAL" },
];

// Puan çarpanları
const indeksPuanlari = {
  SCI_E_SSCI_AHCI: 4,
  E_SCI: 3,
  ULUSLARARASI: 2,
  ULUSAL: 1,
  GUZEL_SANATLAR_ULUSLARARASI: 3,
  GUZEL_SANATLAR_ULUSAL: 1,
} as const;

export default function AtifForm({ onSave }: AtifFormProps) {
  const [atif, setAtif] = useState({
    atifYapanEser: "",
    indeks: "SCI_E_SSCI_AHCI" as keyof typeof indeksPuanlari,
    atifSayisi: 1,
  });

  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setKullaniciId(parseInt(userId));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAtif((prev) => ({
      ...prev,
      [name]: name === "atifSayisi" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID'si bulunamadı.");
      return;
    }

    const puan = atif.atifSayisi * indeksPuanlari[atif.indeks];

    const payload = {
      kullaniciId,
      atifYapanEser: atif.atifYapanEser,
      atifSayisi: atif.atifSayisi,
      indeks: atif.indeks,
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/atifEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Sunucu hatası");

      const result = await response.json();
      console.log("Atıf başarıyla kaydedildi:", result);
      onSave(result);
    } catch (error) {
      console.error("Atıf gönderilirken hata oluştu:", error);
      alert("Atıf kaydedilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Atıf Bilgileri</h2>

      <input
        type="text"
        name="atifYapanEser"
        placeholder="Atıf Yapan Eser"
        value={atif.atifYapanEser}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        name="atifSayisi"
        placeholder="Atıf Sayısı"
        value={atif.atifSayisi}
        onChange={handleChange}
        min={1}
        className="border p-2 rounded"
        required
      />

      <select
        name="indeks"
        value={atif.indeks}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        {atifEnumDegerleri.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <div className="text-right text-sm text-gray-600">
        Hesaplanan puan: <strong>{atif.atifSayisi * indeksPuanlari[atif.indeks]}</strong>
      </div>

      <Button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
        Kaydet
      </Button>
    </form>
  );
}
