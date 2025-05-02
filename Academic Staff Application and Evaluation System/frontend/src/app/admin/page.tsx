'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

interface JuryMember {
    id: string;
    name: string;
    tcKimlikNo: string;
}

interface JobPost {
    id: string;
    title: string;
    description: string;
    totalApplications: number;
    deadline: string;
}

const AdminPage = () => {
    const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
    const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);
    const [selectedJobPost, setSelectedJobPost] = useState<JobPost | null>(null);
    const [selectedJury, setSelectedJury] = useState<JuryMember | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        // Burada backend'den verileri alabiliriz, örnek veri simülasyonu:
        setJobPosts([
            {
                id: '1',
                title: 'Profesör Kadrosu',
                description: 'İlanın açıklaması...',
                totalApplications: 5,
                deadline: '2025-05-30',
            },
            {
                id: '2',
                title: 'Doçent Kadrosu',
                description: 'İlanın açıklaması...',
                totalApplications: 3,
                deadline: '2025-06-15',
            },
        ]);

        setJuryMembers([
            { id: '1', name: 'Ahmet Yılmaz', tcKimlikNo: '12345678901' },
            { id: '2', name: 'Mehmet Çelik', tcKimlikNo: '23456789012' },
        ]);
    }, []);

    const handleJobPostSelect = (jobPost: JobPost) => {
        setSelectedJobPost(jobPost);
        // İlanı seçtiğinde kategori seçimleri gibi detaylar yüklenebilir
    };

    const handleJurySelect = (jury: JuryMember) => {
        setSelectedJury(jury);
    };

    const handleSaveJobPost = () => {
        if (selectedJobPost && selectedCategory) {
            // İlanı kaydetme işlemi (örneğin API çağrısı)
            console.log(`İlan kaydedildi: ${selectedJobPost.title}, Kategori: ${selectedCategory}`);
        } else {
            alert('Lütfen bir kategori seçin');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6"
                style={{
                    backgroundImage: "url('/banner2.png')",
                    backgroundSize: "cover", // resmi tam kapla
                    backgroundRepeat: "no-repeat", // tekrar etmesin
                    backgroundPosition: "center", // ortala
                }}
            >

                <div className="max-w-4xl bg-white shadow-lg rounded-xl p-8 text-center w-full">
                    <h1 className="text-4xl font-bold text-blue-600 mb-6">Yönetici Sayfası</h1>

                    {/* İlanlar Listesi */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-600">Mevcut İlanlar</h2>
                        <div className="flex flex-col gap-4 mt-4">
                            {jobPosts.map((job) => (
                                <div key={job.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <p className="text-gray-600">Başvuru Sayısı: {job.totalApplications}</p>
                                    <p className="text-gray-600">Son Başvuru Tarihi: {job.deadline}</p>
                                    <Button
                                        variant="default"
                                        className="mt-2 w-full bg-black text-white hover:bg-gray-500 hover:cursor-pointer"
                                        onClick={() => handleJobPostSelect(job)}
                                    >
                                        İlanı Görüntüle
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* İlan Detayları ve Jüri Seçimi */}
                    {selectedJobPost && (
                        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">İlan: {selectedJobPost.title}</h2>
                            <p><strong>Açıklama: </strong>{selectedJobPost.description}</p>
                            <p><strong>Başvuru Sayısı: </strong>{selectedJobPost.totalApplications}</p>
                            <p><strong>Son Başvuru Tarihi: </strong>{selectedJobPost.deadline}</p>

                            <div className="mt-6">
                                <h3 className="font-semibold">Kategori Seçimi</h3>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border p-2 rounded w-full mt-2"
                                >
                                    <option value="">Kategori Seçin</option>
                                    <option value="Dr Öğr. Üyesi">Dr Öğr. Üyesi</option>
                                    <option value="Doçent">Doçent</option>
                                    <option value="Profesör">Profesör</option>
                                </select>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold">Jüri Seçimi</h3>
                                <div className="flex flex-col gap-4 mt-4">
                                    {juryMembers.map((jury) => (
                                        <div key={jury.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                            <h4 className="font-semibold text-lg">{jury.name}</h4>
                                            <p className="text-gray-600">TC Kimlik No: {jury.tcKimlikNo}</p>
                                            <Button
                                                variant="default"
                                                className="mt-2 w-full bg-black text-white hover:bg-gray-500 hover:cursor-pointer"
                                                onClick={() => handleJurySelect(jury)}
                                            >
                                                Jüri Olarak Ata
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Kaydet Butonu */}
                            <div className="mt-6 flex justify-center">
                                <Button
                                    variant="default"
                                    className="w-full p-2 border border-gray-400 rounded hover:bg-gray-500 hover:text-white"
                                    onClick={handleSaveJobPost}
                                >
                                    İlanı Kaydet
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
