'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';

interface JobPost {
  id: number;
  baslik: string;
}

interface JuriDegerlendirme {
  id: number;
  rapor: string;
  puan: number;
  tarih: string;
  aday: {
    ad: string;
    soyad: string;
    tcKimlikNo: string;
  };
  juri: {
    ad: string;
    soyad: string;
  };
}

interface BasvuruSonucu {
  id: number;
  durum: string;
  kullanici: {
    ad: string;
    soyad: string;
  };
  ilan: {
    baslik: string;
  };
}

const AssignJury = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [selectedJobPost, setSelectedJobPost] = useState<number | null>(null);
  const [tcKimlikNo, setTcKimlikNo] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [juriDegerlendirmeler, setJuriDegerlendirmeler] = useState<JuriDegerlendirme[]>([]);
  const [basvuruSonuclari, setBasvuruSonuclari] = useState<BasvuruSonucu[]>([]);

  // İlanları çek
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/ilanGetir');
        const data = await response.json();
        setJobPosts(data);
      } catch (error) {
        console.error('İlanlar alınırken hata:', error);
        setErrorMessage('İlanlar yüklenemedi.');
      }
    };

    fetchJobPosts();
  }, []);

  // Jüri değerlendirme ve başvuru sonuçlarını çek
  useEffect(() => {
    const fetchDegerlendirmeler = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/juriDegerlendirmeler');
        const data = await response.json();
        setJuriDegerlendirmeler(data.degerlendirmeler || []);
        setBasvuruSonuclari(data.basvuruSonuclari || []);
      } catch (error) {
        console.error('Değerlendirmeler alınırken hata:', error);
      }
    };

    fetchDegerlendirmeler();
  }, []);

  const handleAssignJury = async () => {
    if (!selectedJobPost || !tcKimlikNo) {
      setErrorMessage('Lütfen ilan seçin ve TC Kimlik No girin.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/juriAta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobPostId: selectedJobPost,
          tcKimlikNo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Jüri başarıyla atandı.');
        setErrorMessage('');
        setTcKimlikNo('');
        setSelectedJobPost(null);
      } else {
        setMessage('');
        setErrorMessage(data.message || 'Bir hata oluştu.');
      }
    } catch (error) {
      console.error('Jüri atama hatası:', error);
      setMessage('');
      setErrorMessage('Sunucuya bağlanırken hata oluştu.');
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6 space-y-12"
        style={{
          backgroundImage: "url('/banner2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-2xl bg-white shadow-lg rounded-xl p-8 mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Jüri Atama</h1>

          {/* İlan listesi */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold text-gray-700">İlanlar</label>
            {jobPosts.length === 0 ? (
              <p>Hiç ilan bulunamadı.</p>
            ) : (
              <div className="space-y-2">
                {jobPosts.map((job) => (
                  <Button
                    key={job.id}
                    variant={selectedJobPost === job.id ? 'outline' : 'default'}
                    className="w-full justify-start"
                    onClick={() => setSelectedJobPost(job.id)}
                  >
                    {job.baslik}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* TC Kimlik No alanı */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold text-gray-700">TC Kimlik No</label>
            <input
              type="text"
              maxLength={11}
              className="w-full border rounded p-2"
              value={tcKimlikNo}
              onChange={(e) => setTcKimlikNo(e.target.value)}
              placeholder="TC Kimlik No girin"
            />
          </div>

          {/* Mesajlar */}
          {message && <div className="text-green-600 mb-4">{message}</div>}
          {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

          {/* Gönder Butonu */}
          <Button
            onClick={handleAssignJury}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Jüriyi Ata
          </Button>
        </div>

        {/* Jüri Değerlendirmeleri */}
        <div className="max-w-5xl bg-white shadow-md rounded-xl p-6 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Jüri Değerlendirmeleri</h2>
          {juriDegerlendirmeler.length === 0 ? (
            <p>Henüz değerlendirme yapılmamış.</p>
          ) : (
            <table className="w-full table-auto text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Jüri</th>
                  <th className="p-2">Aday</th>
                  <th className="p-2">Rapor</th>
                  <th className="p-2">Puan</th>
                  <th className="p-2">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {juriDegerlendirmeler.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-2">{d.juri.ad} {d.juri.soyad}</td>
                    <td className="p-2">{d.aday.ad} {d.aday.soyad}</td>
                    <td className="p-2">{d.rapor}</td>
                    <td className="p-2">{d.puan ?? '-'}</td>
                    <td className="p-2">{new Date(d.tarih).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Başvuru Sonuçları */}
        <div className="max-w-5xl bg-white shadow-md rounded-xl p-6 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Başvuru Sonuçları</h2>
          {basvuruSonuclari.length === 0 ? (
            <p>Henüz başvuru sonucu yok.</p>
          ) : (
            <table className="w-full table-auto text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Aday</th>
                  <th className="p-2">İlan</th>
                  <th className="p-2">Durum</th>
                </tr>
              </thead>
              <tbody>
                {basvuruSonuclari.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="p-2">{b.kullanici.ad} {b.kullanici.soyad}</td>
                    <td className="p-2">{b.ilan.baslik}</td>
                    <td className="p-2 font-semibold">{b.durum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignJury;
