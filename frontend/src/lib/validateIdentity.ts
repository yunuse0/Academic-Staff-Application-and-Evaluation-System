interface IdentityPayload {
  TCKimlikNo: string;
  ad: string;
  soyad: string;
  DogumYili: string;
}

export async function validateIdentity({ TCKimlikNo, ad, soyad, DogumYili }: IdentityPayload): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:3001/api/kimlikDogrula", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ TCKimlikNo, ad, soyad, DogumYili }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Kimlik doğrulama başarısız:", data.message);
      return false;
    }

    return true; 
  } catch (error) {
    console.error("Kimlik doğrulama isteği sırasında hata:", error);
    return false;
  }
}
