"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole"); // Burada "userRole" doğru
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        alert("Çıkış yapıldı.");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        router.push("/login");
    };


    type LinkItem = {
        href: string;
        label: string;
        onClick?: () => void;
    };

    let links: LinkItem[] = [
        { href: "/", label: "Ana Sayfa" },
    ];

    if (role) {
        switch (role) {
            case "ADAY":
                links = [
                    { href: "/AdayPage", label: "Aday Sayfası" },
                    { href: "/IlanlarPage", label: "İlanlar" },
                    { href: "#", label: "Çıkış Yap", onClick: handleLogout },
                ];
                break;
            case "JURI_UYESI":
                links = [
                    { href: "/jury", label: "Jüri Sayfası" },
                    { href: "#", label: "Çıkış Yap", onClick: handleLogout },
                ];
                break;
            case "ADMIN":
                links = [
                    { href: "/admin", label: "Admin Paneli" },
                    { href: "#", label: "Çıkış Yap", onClick: handleLogout },
                ];
                break;
            case "YONETICI":
                links = [
                    { href: "/IlanYonetimi", label: "İlan Yönetim Sayfası" },
                    { href: "#", label: "Çıkış Yap", onClick: handleLogout },
                ];
                break;
            default:
                links = [
                    { href: "/", label: "Ana Sayfa" },
                    { href: "/login", label: "Giriş Yap" },
                ];
        }
    } else {
        // Giriş yapmamış kullanıcı
        links.push({ href: "/login", label: "Giriş Yap" });
    }

    return (
        <nav className="bg-black p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center ">
                <div className="font-bold text-2xl hover:bg-gray-800 " onClick={() => router.push("/")}>Akademik Başvuru Sistemi</div>
                <div className="flex space-x-7">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={(e) => {
                                if (link.onClick) {
                                    e.preventDefault();
                                    link.onClick();
                                }
                            }}
                            className="hover:underline cursor-pointer"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
