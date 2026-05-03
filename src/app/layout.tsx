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
    default: "Integrity Insurance LLC | Medicare and Marketplace Guidance",
    template: "%s",
  },
  description:
    "Integrity Insurance LLC helps clients compare Medicare, Marketplace health insurance, and life insurance options.",
  openGraph: {
    title: "Integrity Insurance LLC",
    description:
      "Licensed Medicare and Marketplace health insurance guidance from Integrity Insurance LLC.",
    url: "https://www.theintegrityinsurance.com",
    siteName: "Integrity Insurance LLC",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/zh",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
