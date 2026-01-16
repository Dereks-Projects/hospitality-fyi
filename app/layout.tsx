import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Hospitality.fyi | Hospitality Industry Insights",
  description: "Deep-dive articles on hospitality, service excellence, and the hotel and restaurant industry.",
  metadataBase: new URL('https://hospitality.fyi'),
  icons: {
    icon: '/hospitality-favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hospitality.fyi',
    title: 'Hospitality.fyi | Hospitality Industry Insights',
    description: 'Deep-dive articles on hospitality, service excellence, and the hotel and restaurant industry.',
    url: 'https://hospitality.fyi',
    images: [
      {
        url: '/hospitality-socialcard.png',
        width: 1200,
        height: 630,
        alt: 'HOSPITALITY.FYI - Hospitality Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOSPITALITY.FYI | Hospitality Industry Insights',
    description: 'Deep-dive articles on hospitality, service excellence, and the hotel and restaurant industry.',
    images: ['/hospitality-socialcard.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top">
      <body className={sourceSans.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}