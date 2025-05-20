'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';

export default function JuriBasvurular() {
  const [juriData, setJuriData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('Kullanıcı ID bulunamadı');
      setLoading(false);
      return;
    }

    const fetchJuriData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/juriBasvuru?userId=${userId}`);
        if (!response.ok) throw new Error('Başvurular alınırken bir hata oluştu');
        const data = await response.json();
        setJuriData(data.ilanlar || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJuriData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6"
        style={{
          backgroundImage: "url('/banner2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >

        <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen min-w-2/3 screen shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Jüri Başvuruları</h2>
          <div className="flex justify-top mt-10">
            <Button
              onClick={() => router.push("/")}
              className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
            >
              Ana Sayfaya Dön
            </Button>
          </div>
          <br></br><hr></hr><br></br>

          {juriData.length === 0 ? (
            <p className="text-center text-gray-600">Başvuru bulunmamaktadır.</p>
          ) : (
            <div className="space-y-8">
              {juriData.map((ilan) => (
                <div key={ilan.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <h3 className="text-2xl font-semibold text-blue-800 mb-2">{ilan.baslik}</h3>
                  <p className="text-gray-700 mb-4">{ilan.aciklama}</p>

                  <h4 className="font-semibold mb-2">Başvuran Adaylar:</h4>
                  <ul className="space-y-4">
                    {ilan.basvurular.map((basvuru: any) => (
                      <li
                        key={basvuru.id}
                        className="flex items-center justify-between bg-gray-100 p-4 rounded"
                      >
                        <div>
                          <p className="font-medium">
                            {basvuru.kullanici.ad} {basvuru.kullanici.soyad}
                          </p>
                          <p className="text-sm text-gray-600">
                            TC Kimlik No: {basvuru.kullanici.tcKimlikNo}
                          </p>
                        </div>
                        <Button
                          onClick={() => router.push(`/jury/aday/${basvuru.kullanici.id}`)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 c"
                        >
                          Adayı Görüntüle
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
