import { LoginForm } from "@/components/LoginForm";
import Navbar from "@/components/navbar";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex items-center justify-center min-h-screen bg-stone-200 p-6"
                style={{
                    backgroundImage: "url('/banner2.png')",
                    backgroundSize: "cover", // resmi tam kapla
                    backgroundRepeat: "no-repeat", // tekrar etmesin
                    backgroundPosition: "center", // ortala
                }}
            >

                <div className="bg-white p-6 rounded-lg shadow-lg position-relative w-full max-w-md max-h-full ">

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hoş Geldiniz!</h2>
                    <LoginForm />
                </div>
            </main>
        </div>
    );
}