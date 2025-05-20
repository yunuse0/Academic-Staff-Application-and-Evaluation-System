import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const sanatFaaliyetTuruListesi = [
    { value: "GS1", label: "Özgün sanat eserlerinin, tasarım veya yorum çalışmalarının yurt dışında sanat, eğitim ve kültür kurumlarınca satın alınması veya bu eser(ler) için telif ödenmesi (Kurumlar bazında puanlama yapılır)", puan: 100 },
    { value: "GS2", label: "Özgün sanat eserlerinin, tasarım veya yorum çalışmalarının yurt içinde sanat, eğitim ve kültür kurumlarınca satın alınması veya bu eser(ler) için telif ödenmesi (Kurumlar bazında puanlama yapılır)", puan: 90 },
    { value: "GS3", label: "Yerel Yönetimler veya Özel Kuruluşların desteklediği kamusal alanda kalıcı olarak gerçekleştirilen sanat projeleri (Heykel, Duvar Resmi / Graffiti, Enstalasyon vb.) (Kurumlar bazında puanlama yapılır)", puan: 85 },
    { value: "GS4", label: "Galerilerde, müzelerde, sanat ve kültür merkezlerinde gerçekleştirilen Küratörlük etkinlikleri (En fazla iki kez puanlanır) (Yabancı dilde)", puan: 80 },
    { value: "GS5", label: "Özgün sanat eserleri, tasarımlar ya da yorum/icra çalışmalarıyla yurtdışında uluslararası jürili kişisel etkinlikte bizzat katılım", puan: 75 },
    { value: "GS6", label: "Özgün sanat eserleri, tasarımlar ya da yorum/icra çalışmalarıyla yurtiçinde jürili kişisel etkinlikte bizzat katılım", puan: 70 },
    { value: "GS7", label: "Yurtdışında uluslararası jürili karma/ortak etkinlikte bizzat katılım", puan: 65 },
    { value: "GS8", label: "Yurtiçinde ulusal jürili karma/ortak etkinlikte bizzat katılım", puan: 60 },
    { value: "GS9", label: "Uluslararası çalıştay/workshop/sempozyum/yarışma/festival/şenlikte yöneticilik/yürütücülük", puan: 55 },
    { value: "GS10", label: "Ulusal çalıştay/workshop/sempozyum/yarışma/festival/şenlikte yöneticilik/yürütücülük", puan: 50 },
    { value: "GS11", label: "Uluslararası çalıştay/workshop/sempozyum/yarışma/festival/şenlikte araştırmacılık/kurul üyeliği", puan: 45 },
    { value: "GS12", label: "Ulusal çalıştay/workshop/sempozyum/yarışma/festival/şenlikte araştırmacılık/kurul üyeliği", puan: 40 },
    { value: "GS13", label: "Uluslararası yarışmalarda/festivallerde/şenliklerde jüri üyeliği", puan: 35 },
    { value: "GS14", label: "Ulusal yarışmalarda/festivallerde/şenliklerde jüri üyeliği", puan: 30 },
    { value: "GS15", label: "Üretilen eserlerin uluslararası haber/yayın organlarında yer alması veya gösterime/dinletime girmesi", puan: 25 },
    { value: "GS16", label: "Üretilen eserlerin ulusal haber/yayın organlarında yer alması veya gösterime/dinletime girmesi", puan: 20 },
    { value: "GS17", label: "Uluslararası resital icra etmek", puan: 15 },
    { value: "GS18", label: "Uluslararası konserlerde solist icracı olarak yer almak", puan: 10 },
    { value: "GS19", label: "Uluslararası konserlerde karma icracı olarak yer almak", puan: 5 },
    { value: "GS20", label: "Uluslararası konserlerde orkestra/müzik/koro şefliği", puan: 0 },
    { value: "GS21", label: "Uluslararası oda müziği konserinde icracı olarak yer almak", puan: 0 },
    { value: "GS22", label: "Uluslararası konserlerde grup şefi olarak yer almak", puan: 0 },
    { value: "GS23", label: "Uluslararası konserlerde grup üyesi olarak yer almak", puan: 0 },
    { value: "GS24", label: "Uluslararası resital/koro konserinde eşlikçi olarak yer almak", puan: 0 },
    { value: "GS25", label: "Uluslararası konserlerde konser yönetmenliği/dinleti koordinatörlüğü", puan: 0 },
    { value: "GS26", label: "Ulusal resital icra etmek", puan: 0 },
    { value: "GS27", label: "Ulusal bireysel dinletide yer almak", puan: 0 },
    { value: "GS28", label: "Ulusal karma dinletide yer almak", puan: 0 },
    { value: "GS29", label: "Ulusal orkestra/müzik/koro şefliği", puan: 0 },
    { value: "GS30", label: "Ulusal oda müziği konserinde icracı olmak", puan: 0 },
    { value: "GS31", label: "Ulusal konserlerde grup şefi olarak yer almak", puan: 0 },
    { value: "GS32", label: "Ulusal konserlerde grup üyesi olarak yer almak", puan: 0 },
    { value: "GS33", label: "Ulusal resital/koro konserinde eşlikçi olarak yer almak", puan: 0 },
    { value: "GS34", label: "Ulusal konserlerde konser yönetmenliği/dinleti koordinatörlüğü", puan: 0 },
    { value: "GS35", label: "Uluslararası sesli/görsel yayınlarda bireysel ses yayını", puan: 0 },
    { value: "GS36", label: "Uluslararası sesli/görsel yayınlarda karma ses yayını", puan: 0 },
    { value: "GS37", label: "Uluslararası sesli/görsel yayınlarda sanat yönetmeni/müzik yönetmeni olarak hazırlama", puan: 0 },
    { value: "GS38", label: "Uluslararası radyo/TV etkinliği - Program hazırlamak", puan: 0 },
    { value: "GS39", label: "Uluslararası radyo/TV etkinliği - Bireysel katılım", puan: 0 },
    { value: "GS40", label: "Uluslararası radyo/TV etkinliği - Karma katılım", puan: 0 },
    { value: "GS41", label: "Ulusal sesli/görsel yayınlarda bireysel ses yayını", puan: 0 },
    { value: "GS42", label: "Ulusal sesli/görsel yayınlarda karma ses yayını", puan: 0 },
    { value: "GS43", label: "Ulusal sesli/görsel yayınlarda sanat yönetmeni/müzik yönetmeni olarak hazırlama", puan: 0 },
    { value: "GS44", label: "Ulusal radyo/TV etkinliği - Program hazırlamak", puan: 0 },
    { value: "GS45", label: "Ulusal radyo/TV etkinliği - Bireysel katılım", puan: 0 },
    { value: "GS46", label: "Ulusal radyo/TV etkinliği - Karma katılım", puan: 0 },
    { value: "GS47", label: "0–5 dk. Ulusal orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS48", label: "5–10 dk. Ulusal orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS49", label: "10–15 dk. Ulusal orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS50", label: "15+ dk. Ulusal orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS51", label: "0–5 dk. Ulusal oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS52", label: "5–10 dk. Ulusal oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS53", label: "10–15 dk. Ulusal oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS54", label: "15+ dk. Ulusal oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS55", label: "0–5 dk. Ulusal elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS56", label: "5–10 dk. Ulusal elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS57", label: "10–15 dk. Ulusal elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS58", label: "15+ dk. Ulusal elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS59", label: "0–5 dk. Uluslararası orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS60", label: "5–10 dk. Uluslararası orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS61", label: "10–15 dk. Uluslararası orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS62", label: "15+ dk. Uluslararası orkestra için eser sahibi olmak", puan: 0 },
    { value: "GS63", label: "0–5 dk. Uluslararası oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS64", label: "5–10 dk. Uluslararası oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS65", label: "10–15 dk. Uluslararası oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS66", label: "15+ dk. Uluslararası oda müziği eseri sahibi olmak", puan: 0 },
    { value: "GS67", label: "0–5 dk. Uluslararası elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS68", label: "5–10 dk. Uluslararası elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS69", label: "10–15 dk. Uluslararası elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS70", label: "15+ dk. Uluslararası elektronik/elektro-akustik müzik eseri", puan: 0 },
    { value: "GS71", label: "Türk müziği makamlarıyla bestelenmiş geleneksel formlarda eser sahibi olmak (Nota ile)", puan: 0 },
    { value: "GS72", label: "Türk müziği eserini bestelemek ve ulusal seslendirme", puan: 0 },
    { value: "GS73", label: "Uluslararası müzik festivali ya da şenliğinde eser seslendirme", puan: 0 },
    { value: "GS74", label: "Ulusal müzik festivali ya da şenliğinde eser seslendirme", puan: 0 },
    { value: "GS75", label: "Uluslararası dans festivali ya da etkinliğinde eser seslendirme", puan: 0 },
    { value: "GS76", label: "Ulusal dans festivali ya da etkinliğinde eser seslendirme", puan: 0 },
    { value: "GS77", label: "Uluslararası orkestrasyon çalışması yapmak", puan: 0 },
    { value: "GS78", label: "Ulusal orkestrasyon çalışması yapmak", puan: 0 },
    { value: "GS79", label: "Uluslararası seslendirme sanatçılığı yapmak", puan: 0 },
    { value: "GS80", label: "Ulusal seslendirme sanatçılığı yapmak", puan: 0 },
    { value: "GS81", label: "Uluslararası ödüllü eser sahipliği", puan: 0 },
    { value: "GS82", label: "Ulusal ödüllü eser sahipliği", puan: 0 },
    { value: "GS83", label: "Uluslararası müzik eğitimi vermek", puan: 0 },
    { value: "GS84", label: "Ulusal müzik eğitimi vermek", puan: 0 },
    { value: "GS85", label: "Uluslararası tiyatro prodüksiyonunda görev almak", puan: 0 },
    { value: "GS86", label: "Ulusal tiyatro prodüksiyonunda görev almak", puan: 0 },
    { value: "GS87", label: "Uluslararası dans prodüksiyonunda görev almak", puan: 0 },
    { value: "GS88", label: "Ulusal dans prodüksiyonunda görev almak", puan: 0 },
    { value: "GS89", label: "Uluslararası sinema prodüksiyonunda görev almak", puan: 0 },
    { value: "GS90", label: "Ulusal sinema prodüksiyonunda görev almak", puan: 0 },
    { value: "GS91", label: "Uluslararası sanat eğitimi programı düzenlemek", puan: 0 },
    { value: "GS92", label: "Ulusal sanat eğitimi programı düzenlemek", puan: 0 },
    { value: "GS93", label: "Uluslararası sanat galerisi etkinliği düzenlemek", puan: 0 },
    { value: "GS94", label: "Ulusal sanat galerisi etkinliği düzenlemek", puan: 0 },
    { value: "GS95", label: "Uluslararası performans sanatları etkinliği düzenlemek", puan: 0 },
    { value: "GS96", label: "Ulusal performans sanatları etkinliği düzenlemek", puan: 0 },
    { value: "GS97", label: "Uluslararası sanat sergisi düzenlemek", puan: 0 },
    { value: "GS98", label: "Ulusal sanat sergisi düzenlemek", puan: 0 },
    { value: "GS99", label: "Uluslararası sanat festivali düzenlemek", puan: 0 },
    { value: "GS100", label: "Ulusal sanat festivali düzenlemek", puan: 0 },
    { value: "GS101", label: "Uluslararası müzik albümü çıkarmak", puan: 0 },
    { value: "GS102", label: "Ulusal müzik albümü çıkarmak", puan: 0 },
    { value: "GS103", label: "Uluslararası sanat müzesi açmak", puan: 0 },
    { value: "GS104", label: "Ulusal sanat müzesi açmak", puan: 0 },
    { value: "GS105", label: "Uluslararası sanat galerisi açmak", puan: 0 }
  ];
  

interface SanatFormProps {
  onSave: (data: any) => void;
}

const SanatForm: React.FC<SanatFormProps> = ({ onSave }) => {
  const [faaliyetAdi, setFaaliyetAdi] = useState("");
  const [faaliyetTuru, setFaaliyetTuru] = useState("GS1");
  const [yil, setYil] = useState(new Date().getFullYear());
  const [puan, setPuan] = useState(100);
  const [kullaniciId, setKullaniciId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setKullaniciId(parseInt(id));
  }, []);

  const handleFaaliyetTuruChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setFaaliyetTuru(selected);
    const selectedFaaliyet = sanatFaaliyetTuruListesi.find((t) => t.value === selected);
    setPuan(selectedFaaliyet?.puan || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kullaniciId) {
      alert("Kullanıcı ID bulunamadı.");
      return;
    }

    const data = {
      kullaniciId,
      faaliyetAdi,
      faaliyetTuru,
      yil,
      puan,
    };

    try {
      const response = await fetch("http://localhost:3001/api/sanatEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sunucu hatası.");
      }

      const result = await response.json();
      console.log("Faaliyet kaydedildi:", result);
      onSave(result);
    } catch (err) {
      console.error("Faaliyet ekleme hatası:", err);
      alert("Faaliyet kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Güzel Sanatlar Faaliyeti Ekle</h2>

      <input
        type="text"
        placeholder="Faaliyet Adı"
        value={faaliyetAdi}
        onChange={(e) => setFaaliyetAdi(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <div className="flex flex-col">
        <label htmlFor="yil" className="text-sm font-semibold">Yıl</label>
        <input
          id="yil"
          type="number"
          value={yil}
          onChange={(e) => setYil(parseInt(e.target.value))}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="faaliyetTuru" className="text-sm font-semibold">Faaliyet Türü</label>
        <select
          id="faaliyetTuru"
          value={faaliyetTuru}
          onChange={handleFaaliyetTuruChange}
          className="border p-2 rounded"
          required
        >
          {sanatFaaliyetTuruListesi.map((tur) => (
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

export default SanatForm;
