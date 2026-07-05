import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NetworkErrorBoundary } from "./components/network-boarder";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Official HCEC Website",
  description: "His Coming Evangelical Church Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link className="h-20 w-25" rel="icon" href="/assets/HCEC_LOGO.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8fafc] text-gray-900 flex flex-col min-h-screen`}
      >
        <NetworkErrorBoundary>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </NetworkErrorBoundary>
      </body>
    </html>
  );
}
