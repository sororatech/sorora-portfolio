import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import GlobalBackground from "@/components/layout/GlobalBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"], 
});

export const metadata: Metadata = {
  title: "Sorora Tech | Innovative Software Solutions", 
  description: "We build cutting-edge software solutions and digital experiences for modern businesses.", 
  icons: {
    icon: "/sorora-logo.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body 
        className={`${nunito.variable} min-h-full flex flex-col font-sans bg-background text-foreground antialiased`}
        suppressHydrationWarning={true}
      >
        <GlobalBackground />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}