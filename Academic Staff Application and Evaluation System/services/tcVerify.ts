const validateIdentity = async (TCKimlikNo, ad, soyad, DogumYili) => {
  TCKimlikNo = Number(TCKimlikNo);

  const payload = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
          <TCKimlikNo>${TCKimlikNo}</TCKimlikNo>
          <Ad>${ad}</Ad>
          <Soyad>${soyad}</Soyad>
          <DogumYili>${DogumYili}</DogumYili>
        </TCKimlikNoDogrula>
      </soap12:Body>
    </soap12:Envelope>
  `;

  try {
    const res = await fetch(
      "https://tckimlik.nvi.gov.tr/service/kpspublic.asmx",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/soap+xml; charset=utf-8",
        },
        body: payload.trim(),
      }
    );

    const text = await res.text();
    const match = text.match(/<TCKimlikNoDogrulaResult>(.*?)<\/TCKimlikNoDogrulaResult>/);

    return match && match[1] === "true";
  } catch (err) {
    console.error("Kimlik doğrulama sırasında hata oluştu:", err);
    throw new Error("Kimlik doğrulama gerçekleştirilemedi.");
  }
};

export default validateIdentity;