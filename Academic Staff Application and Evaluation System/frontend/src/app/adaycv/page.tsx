"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Modal from "@/components/cv/Modal";
import MakaleForm from "@/components/cv/MakaleForm";
import BilimselToplantiForm from "@/components/cv/BilimselToplantiForm";
import KitapForm from "@/components/cv/KitapForm";
import AtifForm from "@/components/cv/AtifForm";
import EgitimForm from "@/components/cv/EgitimForm";
import TezForm from "@/components/cv/TezForm";
import PatentForm from "@/components/cv/PatentForm";
import ArastirmaProjesiForm from "@/components/cv/ArastirmaProjesiForm";
import EditorlukForm from "@/components/cv/EditorlukForm";
import OdullerForm from "@/components/cv/OdullerForm";
import IdariGorevlerForm from "@/components/cv/IdariGorevlerForm";
import GuzelSanatlarForm from "@/components/cv/GuzelSanatlarForm";


export default function AdayPage() {
    const router = useRouter();
    const handleGoBack = () => {
        router.push("/AdayPage");
    };

    const [modalType, setModalType] = useState<"makale" | "toplanti" | "kitap" | "atif" | "egitim" | "tez" | "patent" | "proje" | "editorluk" | "oduller" | "idarigorev" | "guzelsanatlar" | null>(null);

    const handleMakaleSave = (data: any) => {
        console.log("Makale Kaydedildi:", data);
        setModalType(null);
    };
    const handleToplantiSave = (data: any) => {
        console.log("Bilimsel Toplantı Kaydedildi:", data);
        setModalType(null);
    }
    const handleKitapSave = (data: any) => {
        console.log("Kitap Kaydedildi:", data);
        setModalType(null);
    };
    const handleAtifSave = (data: any) => {
        console.log("Atıf Kaydedildi:", data);
        setModalType(null);
    };
    const handleEgitimSave = (data: any) => {
        console.log("Eğitim Faaliyeti Kaydedildi:", data);
        setModalType(null);
    };
    const handleTezSave = (data: any) => {
        console.log("Tez Kaydedildi:", data);
        setModalType(null);
    };
    const handlePatentSave = (data: any) => {
        console.log("Patent Kaydedildi:", data);
        setModalType(null);
    }
    const handleArastirmaProjesiSave = (data: any) => {
        console.log("Araştırma Projesi Kaydedildi:", data);
        setModalType(null);
    };
    const handleEditorlukSave = (data: any) => {
        console.log("Editörlük Kaydedildi:", data);
        setModalType(null);
    };
    const handleOdullerSave = (data: any) => {
        console.log("Ödül Kaydedildi:", data);
        setModalType(null);
    };
    const handleIdariGorevlerSave = (data: any) => {
        console.log("İdari Görevler Kaydedildi:", data);
        setModalType(null);
    };
    const handleGuzelSanatlarSave = (data: any) => {
        console.log("Güzel Sanatlar Kaydedildi:", data);
        setModalType(null);
    };


    return (
        <main className="flex flex-col items-center min-h-screen bg-gray-400 p-6">

            <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 w-full">
                <div className="flex justify-between mt-10">
                    <Button
                        onClick={handleGoBack}
                        className="text-blue-500 hover:bg-blue-200 rounded "
                    >
                        Aday Sayfasına Geri Dön
                    </Button>
                    <Button
                        onClick={() => router.push("/adaycv/ozgecmisim")}
                        className="text-blue-500 py-2 px-6 rounded hover:bg-blue-200"
                    >
                        Özgeçmişimi İncele
                    </Button>
                </div>
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Aday Özgeçmiş</h1>
                <h2 className="text-l font-semibold  mb-3">Başvuru yapabilmek için lütfen özgeçmişinizi doldurun.</h2>

                <div className="mb-8">
                    <hr></hr>
                    <hr></hr>
                    <br></br>
                    <h2 className="text-xl font-bold mb-3">Makaleler</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("makale")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Makale Ekle
                        </Button>
                    </div>

                    <hr></hr>
                    <br></br>
                    <h2 className="text-xl font-bold mb-3">Bilimsel Toplantılar</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("toplanti")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Bilimsel Toplantı Ekle
                        </Button>
                    </div>

                    <hr></hr>
                    <br></br>


                    <h2 className="text-xl font-bold mb-3">Kitaplar</h2>

                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("kitap")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Kitap Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Atıflar</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("atif")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Atıf Ekle
                        </Button>
                        <hr />
                        <br />
                    </div>
                    <hr></hr>
                    <br></br>
                    <h2 className="text-xl font-bold mb-3">Eğitim Öğretim Faaliyetleri</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("egitim")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Eğitim Faaliyeti Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Tez Yöneticiliği</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("tez")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Tez Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Patentler</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("patent")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Patent Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Araştırma Projeleri</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("proje")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Araştırma Projesi Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Editörlük, Yayın Kurulu Üyeliği ve Hakemlik Faaliyetleri </h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("editorluk")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Faaliyet veya üyelik ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Ödüller </h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("oduller")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Ödül Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">İdari Görevler ve Üniversite Katılım Faaliyetleri </h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("idarigorev")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Görev ve Faaliyet Ekle
                        </Button>
                    </div>
                    <hr />
                    <br />
                    <h2 className="text-xl font-bold mb-3">Güzel Sanatlar Faaliyetleri</h2>
                    <div className="flex gap-4 mb-4">
                        <Button
                            onClick={() => setModalType("guzelsanatlar")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:w-2/7"
                        >
                            + Güzel Sanatlar Faaliyeti Ekle
                        </Button>
                    </div>
                    <Modal
                        isOpen={modalType === "makale"}
                        onClose={() => setModalType(null)}
                        title="Makale Ekle"
                    >
                        <MakaleForm onSave={handleMakaleSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "toplanti"}
                        onClose={() => setModalType(null)}
                        title="Bilimsel Toplantı Ekle"
                    >
                        <BilimselToplantiForm onSave={handleToplantiSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "kitap"}
                        onClose={() => setModalType(null)}
                        title="Kitap Ekle"
                    >
                        <KitapForm onSave={handleKitapSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "atif"}
                        onClose={() => setModalType(null)}
                        title="Atıf Ekle"
                    >
                        <AtifForm onSave={handleAtifSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "egitim"}
                        onClose={() => setModalType(null)}
                        title="Eğitim Öğretim Faaliyeti Ekle"
                    >
                        <EgitimForm onSave={handleEgitimSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "tez"}
                        onClose={() => setModalType(null)}
                        title="Tez Yöneticiliği Ekle"
                    >
                        <TezForm onSave={handleTezSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "patent"}
                        onClose={() => setModalType(null)}
                        title="Patent Ekle"
                    >
                        <PatentForm onSave={handlePatentSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "proje"}
                        onClose={() => setModalType(null)}
                        title="Araştırma Projesi Ekle"
                    >
                        <ArastirmaProjesiForm onSave={handleArastirmaProjesiSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "editorluk"}
                        onClose={() => setModalType(null)}
                        title="Editörlük, Yayın Kurulu Üyeliği ve Hakemlik Faaliyetleri Ekle"
                    >
                        <EditorlukForm onSave={handleEditorlukSave} />
                    </Modal>
                    <Modal
                        isOpen={modalType === "oduller"}
                        onClose={() => setModalType(null)}
                        title="Ödül Ekle"
                    >
                        <OdullerForm onSave={handleOdullerSave} />
                    </Modal>
                </div>
                <Modal
                    isOpen={modalType === "idarigorev"}
                    onClose={() => setModalType(null)}
                    title="İdari Görevler Ekle"
                >
                    <IdariGorevlerForm onSave={handleIdariGorevlerSave} />
                </Modal>
                <Modal
                    isOpen={modalType === "guzelsanatlar"}
                    onClose={() => setModalType(null)}
                    title="Güzel Sanatlar Faaliyetleri Ekle"
                >
                    <GuzelSanatlarForm onSave={handleGuzelSanatlarSave} />
                </Modal>
            </div>
        </main>
    );
}