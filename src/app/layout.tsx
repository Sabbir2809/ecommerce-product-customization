import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import ToastContainer from "@/components/ui/ToastContainer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tizaraa || E-Commerce Product Customization",
  description:
    "E-Commerce Product Customization System with multi-step variant selection, real-time 3D preview, dynamic pricing and advanced cart management.",
  icons: { icon: "/logo.png" },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
