import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Using Playfair for Headlines if needed for premium feel
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "x CLUB | Elite Business Community",
    description: "Discipline. Squad. Mentor.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`${inter.variable} ${playfair.variable} bg-navy font-sans antialiased text-slate-100`}>
                {children}
            </body>
        </html>
    );
}
