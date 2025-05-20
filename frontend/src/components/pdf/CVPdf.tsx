"use client";

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: "Helvetica",
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 6,
        textDecoration: "underline",
    },
    item: {
        marginBottom: 4,
    },
});

interface CVPdfProps {
    data: any;
}

const CVPdf = ({ data }: CVPdfProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
                Aday zgeçmis Belgesi
            </Text>

            {/* A. Makaleler */}
            <View style={styles.section}>
                <Text style={styles.heading}>A. Makaleler</Text>
                {data.makaleler?.map((m: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {m.yayinAdi} ({m.indeksTuru}) - {m.puan ? m.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>


            {/* B. Bilimsel Toplantılar */}
            <View style={styles.section}>
                <Text style={styles.heading}>B. Bilimsel Toplantilar</Text>
                {data.toplantilar?.map((t: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {t.bildiriAdi || t.konferansAdi} ({t.etkinlikTuru}) - {t.puan ? t.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>


            {/* C. Kitaplar */}
            <View style={styles.section}>
                <Text style={styles.heading}>C. Kitaplar</Text>
                {data.kitaplar?.map((k: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {k.kitapAdi} ({k.tur}) - {k.puan ? k.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>D. Atiflar</Text>
                {data.atiflar?.map((a: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {a.atifYapanEser} ({a.indeks}) - {a.puan ? a.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>E. Egitim-Ogretim Faaliyetleri</Text>
                {data.egitimOgretim?.map((e: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {e.dersAdi} ({e.programAdi}) - {e.dersTuru} - {e.dersDonemi} - {e.puan ? e.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>F. Tez Yonetimligi</Text>
                {data.tezYoneticiligi?.map((t: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {t.ogrenciAdi} - {t.tezAdi} ({t.enstitu || "Enstitü Belirtilmemiş"}) - {t.tezTuru} - {t.puan ? t.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>G. Patentler</Text>
                {data.patentler?.map((p: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {p.patentAdi} ({p.patentTuru}) - {p.puan ? p.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>H. Arastirma Projeleri</Text>
                {data.arastirmaProjeleri?.map((ap: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {ap.projeAdi} ({ap.projeTuru}) - {ap.puan ? ap.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>I. Editorluk Faaliyetleri</Text>
                {data.editorlukFaaliyetleri?.map((ef: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {ef.dergiAdi} ({ef.editTuru}) - {ef.puan ? ef.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>J. Oduller</Text>
                {data.oduller?.map((o: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {o.odulAdi} ({o.odulTuru}) - {o.puan ? o.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>K. Idari Gorevler</Text>
                {data.idariGorevler?.map((g: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {g.gorevAdi} ({g.gorevTuru}) - {g.sure} ay suresince - {g.puan ? g.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>L. Guzel Sanatlar Faaliyetleri</Text>
                {data.guzelSanatlarFaaliyetleri?.map((g: any, i: number) => (
                    <Text key={i} style={styles.item}>
                        • {g.faaliyetAdi} ({g.faaliyetTuru}) - {g.puan ? g.puan : "Puan Yok"} puan
                    </Text>
                ))}
            </View>


            {/* Toplam Puan */}
            <View style={styles.section}>
                <Text style={styles.heading}>Toplam Puan</Text>
                <Text>
                    {
                        (data.makaleler?.reduce((sum: number, m: any) => sum + (m.puan || 0), 0) || 0) +
                        (data.toplantilar?.reduce((sum: number, t: any) => sum + (t.puan || 0), 0) || 0) +
                        (data.kitaplar?.reduce((sum: number, k: any) => sum + (k.puan || 0), 0) || 0)
                    } puan
                </Text>
            </View>
        </Page>
    </Document>
);

export default CVPdf;
