"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

const kadroTurleri = [
    { value: "DR_OGR_UYESI", label: "Dr. Öğr. Üyesi" },
    { value: "DOCENT", label: "Doçent" },
    { value: "PROFESOR", label: "Profesör" },
];

const durumlar = [
    { value: "ACIK", label: "Açık" },
    { value: "KAPALI", label: "Kapalı" },
];

const IlanYonetimi = () => {
    const router = useRouter();
    const handleGoHome = () => {
        router.push("/"); // Ana sayfaya yönlendirme
    }
    const [form, setForm] = useState({
        baslik: "",
        aciklama: "",
        kadro: "DR_OGR_UYESI",
        baslangicTarihi: "",
        bitisTarihi: "",
        kriterler: "",
        durum: "ACIK",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3001/api/ilanEkle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    baslangicTarihi: new Date(form.baslangicTarihi),
                    bitisTarihi: new Date(form.bitisTarihi),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "İlan oluşturulamadı.");
                return;
            }

            alert("İlan başarıyla oluşturuldu!");
            router.push("/IlanlarPage"); // ilanlar listesine yönlendiriyoruz
        } catch (error) {
            console.error("İlan oluşturma hatası:", error);
            alert("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-6"
                style={{
                    backgroundImage: "url('/banner2.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >


                <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 ">
                    <Button
                        onClick={handleGoHome}
                        className="text-blue-600 hover:bg-blue-200 rounded "
                    >
                        Ana Sayfaya Geri Dön
                    </Button>
                    <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">İlan Oluştur</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 font-semibold">Başlık</label>
                            <input
                                type="text"
                                name="baslik"
                                value={form.baslik}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Açıklama</label>
                            <textarea
                                name="aciklama"
                                value={form.aciklama}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Kadro Türü</label>
                            <select
                                name="kadro"
                                value={form.kadro}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                {kadroTurleri.map((kadro) => (
                                    <option key={kadro.value} value={kadro.value}>
                                        {kadro.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-semibold">Başlangıç Tarihi</label>
                                <input
                                    type="date"
                                    name="baslangicTarihi"
                                    value={form.baslangicTarihi}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold">Bitiş Tarihi</label>
                                <input
                                    type="date"
                                    name="bitisTarihi"
                                    value={form.bitisTarihi}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Kriterler</label>
                            <textarea
                                name="kriterler"
                                value={form.kriterler}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Durum</label>
                            <select
                                name="durum"
                                value={form.durum}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                {durumlar.map((durum) => (
                                    <option key={durum.value} value={durum.value}>
                                        {durum.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-gray-300 hover:bg-gray-400 p-1 w-2/3 rounded-lg flex justify-center">
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? "Oluşturuluyor..." : "İlanı Oluştur"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default IlanYonetimi;
