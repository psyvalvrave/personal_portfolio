// src/app/layout.js
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "@/app/globals.css";

const geistSans  = Geist({  variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono  = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const caveatFont = Caveat({    weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
    title:       "Zhecheng Li",
    description: "Zhecheng Li's Personal Portfolio Website",
    icons: {
        icon: [
        { url: "/personal_portfolio_icon.svg", type: "image/svg+xml", sizes: "any" },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html 
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}`}
        >
        <body>
            {children}
        </body>
        </html>
    );
}
