import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Edu Platform",
    description: "Your one-stop solution for online learning.",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en" className="scroll-smooth">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <Provider>{children}</Provider>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
