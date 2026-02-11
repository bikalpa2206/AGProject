import { Outfit, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/AuthContext";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const metadata = {
    title: "Witty Travels & Eats",
    description: "A sarcastic guide to world travel and questionable food choices.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${lora.variable}`}>
                <AuthProvider>
                    <Header />
                    <main style={{ minHeight: '80vh' }}>
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
