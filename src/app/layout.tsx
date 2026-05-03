import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theintegrityinsurance.com"),
  title: {
    default: "Integrity Insurance LLC | Medicare 与 Marketplace 健康保险咨询",
    template: "%s",
  },
  description:
    "Integrity Insurance LLC 提供 Medicare、Marketplace 健康保险和人寿保险咨询。",
  openGraph: {
    title: "Integrity Insurance LLC",
    description:
      "Integrity Insurance LLC 提供 Medicare、Marketplace 健康保险和人寿保险咨询。",
    url: "https://www.theintegrityinsurance.com",
    siteName: "Integrity Insurance LLC",
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      "zh-CN": "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
