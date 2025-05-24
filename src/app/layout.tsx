import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DiConta - Sistema de Gestão Financeira",
  description: "Sistema moderno de gestão financeira para escritórios contábeis",
  openGraph: {
    title: "DiConta - Sistema de Gestão Financeira",
    description: "Sistema moderno de gestão financeira para escritórios contábeis",
    url: "https://diconta.vercel.app/dashboard",
    siteName: "DiConta",
    images: [
      {
        url: "/DiConta.png",
        width: 1200,
        height: 630,
        alt: "DiConta - Sistema de Gestão Financeira",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
