import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

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
  
    <html lang="en" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning={true}>
      <body 
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}