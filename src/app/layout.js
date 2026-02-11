import { Permanent_Marker, Montserrat, Open_Sans } from "next/font/google"; // turbo
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/AuthContext";

const permanentMarker = Permanent_Marker({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-accent",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const openSans = Open_Sans({
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
            <body className={`${permanentMarker.variable} ${montserrat.variable} ${openSans.variable}`}>
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
