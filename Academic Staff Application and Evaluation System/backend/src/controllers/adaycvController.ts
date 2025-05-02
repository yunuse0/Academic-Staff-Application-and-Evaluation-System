// controllers/adayCvController.ts
import { RequestHandler } from 'express';

import { getMakalelerByKullaniciId } from '../services/makaleService';
import { getToplantilarByKullaniciId } from '../services/toplantiService';
import { getEgitimByKullaniciId } from '../services/eduService';
import { getTezlerByKullaniciId } from '../services/tezService';
import { getPatentlerByKullaniciId } from '../services/patentService';
import { getProjelerByKullaniciId } from '../services/projeService';
import { getEditorlukByKullaniciId } from '../services/hakemService';
import { getOdullerByKullaniciId } from '../services/odulService';
import { getGorevlerByKullaniciId } from '../services/gorevService';
import { getSanatlarByKullaniciId } from '../services/sanatService';
import { getKitaplarByKullaniciId } from "../services/kitapService";
import { getAtiflarByKullaniciId } from "../services/atifService";


export const getAdayCV: RequestHandler = async (req, res) => {
    const kullaniciId = Number(req.query.kullaniciId);
    if (!kullaniciId || isNaN(kullaniciId)) {
        res.status(400).json({ message: "Kullanıcı ID zorunlu" });
        return;
    }
    try {
        const [
            makaleler,
            toplantilar,
            egitimOgretim,
            tezler,
            patentler,
            projeler,
            editorluk,
            oduller,
            gorevler,
            sanatFaaliyetleri,
            kitaplar,
            atiflar


        ] = await Promise.all([
            getMakalelerByKullaniciId(kullaniciId),
            getToplantilarByKullaniciId(kullaniciId),
            getEgitimByKullaniciId(kullaniciId),
            getTezlerByKullaniciId(kullaniciId),
            getPatentlerByKullaniciId(kullaniciId),
            getProjelerByKullaniciId(kullaniciId),
            getEditorlukByKullaniciId(kullaniciId),
            getOdullerByKullaniciId(kullaniciId),
            getGorevlerByKullaniciId(kullaniciId),
            getSanatlarByKullaniciId(kullaniciId),
            getKitaplarByKullaniciId(kullaniciId),
            getAtiflarByKullaniciId(kullaniciId)
        ]);

        res.status(200).json({
            makaleler,
            toplantilar,
            egitimOgretim,
            tezler,
            patentler,
            projeler,
            editorluk,
            oduller,
            gorevler,
            sanatFaaliyetleri,
            kitaplar,
            atiflar
        });

    } catch (error: any) {
        console.error("CV verileri alınırken hata:", error);
        res.status(500).json({ message: error.message || "Veri alınamadı" });
    }
};
