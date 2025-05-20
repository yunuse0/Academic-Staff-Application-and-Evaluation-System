import { Router } from "express";
import { createIlan } from "../controllers/ilanController";
import { basvuruYap, getAdayBasvuru } from "../controllers/basvuruController";
import { getIlanlar } from "../controllers/ilanController";
import { getTotalPuan } from "../controllers/toplamPuanlama";
import { getJuriBasvurular } from "../controllers/juriController";
import { validateIdentityController } from "../controllers/tcVerifyController";
import { createUserController, loginUserControler } from "../controllers/userController";

import { createMakale, getMakaleler } from "../controllers/makaleController";
import { getToplantilar, createToplanti } from "../controllers/toplantiController";
import { createFaaliyet, getEgitimFaaliyetleri } from "../controllers/faaliyetController";
import { createKitap, getKitaplar } from "../controllers/kitapController";
import { createAtif, getAtiflar } from "../controllers/atifController";
import { createTez, getTezler } from "../controllers/tezController";
import { createPatent, getPatentler } from "../controllers/patentController";
import { createProje, getProjeler } from "../controllers/projeController";
import { createHakem, getHakemlikler } from "../controllers/hakemController";
import { createOdul, getOduller } from "../controllers/odulController";
import { createGorev, getGorevler } from "../controllers/gorevController";
import { createSanat, getSanatFaaliyetleri } from "../controllers/sanatController";
import { getAdayCV } from "../controllers/adaycvController";
import { assignJuryController } from "../controllers/yoneticiController";
import { createJuriDegerlendirme, getAllJuriDegerlendirmeler } from "../controllers/juriController";






const router = Router();

router.get("/test", (req, res) => {
    res.send("Hello");
})

router.post("/register", createUserController);
router.post("/login", loginUserControler);
router.post("/makaleEkle", createMakale);
router.post("/toplantiEkle", createToplanti);
router.post("/faaliyetEkle", createFaaliyet);
router.post("/kitapEkle", createKitap);
router.post("/atifEkle", createAtif);
router.post("/tezEkle", createTez);
router.post("/patentEkle", createPatent);
router.post("/ilanEkle", createIlan);
router.post("/projeEkle", createProje);
router.post("/sanatEkle", createSanat);
router.post("/gorevEkle", createGorev);
router.post("/hakemEkle", createHakem);
router.post("/odulEkle", createOdul);
router.post("/kimlikDogrula", validateIdentityController);
router.post("/basvuruYap", basvuruYap);
router.post("/juriAta", assignJuryController);
router.post("/juriDegerlendirme", createJuriDegerlendirme);

router.get("/ilanGetir", getIlanlar);
router.get("/toplamPuan", getTotalPuan);
router.get("/juriBasvuru", getJuriBasvurular);
router.get("/juriDegerlendirmeler", getAllJuriDegerlendirmeler);

router.get("/adayMakaleler", getMakaleler);
router.get("/adayToplantilar", getToplantilar);
router.get("/adayKitaplar", getKitaplar);
router.get("/adayAtiflar", getAtiflar);
router.get("/adayFaaliyetler", getEgitimFaaliyetleri);
router.get("/adayTezler", getTezler);
router.get("/adayPatentler", getPatentler);
router.get("/adayProjeler", getProjeler);
router.get("/adayHakemlikler", getHakemlikler);
router.get("/adayOduller", getOduller);
router.get("/adayGorevler", getGorevler);
router.get("/adaySanatFaaliyetleri", getSanatFaaliyetleri);
router.get("/adaycv", getAdayCV);
router.get("/adayBasvuru", getAdayBasvuru);

export default router;