import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "chotchuang.uk";
  const protocol = host.includes("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Chotchuang — Business Analytics, Product & Finance",
      template: "%s — Chotchuang",
    },
    description:
      "A decision-focused portfolio spanning business analytics, product, fintech, automation, and data systems.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      title: "Chotchuang — Decision-focused portfolio",
      description:
        "Business analytics, product, fintech, automation, and data systems—organized around decisions and evidence.",
      images: [
        {
          url: new URL("/og.png", metadataBase).toString(),
          width: 1536,
          height: 1024,
          alt: "Chotchuang — Decisions, built on evidence.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chotchuang — Decision-focused portfolio",
      description:
        "Business analytics, product, fintech, automation, and data systems.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
