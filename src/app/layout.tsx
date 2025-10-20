import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { LeftNav } from "@/components/leftNav";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wallet App",
  description: "MainStack Wallet App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <div className="relative min-h-screen bg-white mt-3 mx-5">
          {/* Left Navigation */}
          <div className="fixed left-0 top-1/2 -translate-y-1/2 ml-2">
            <LeftNav />
          </div>
          {/* Main Content Area */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 mx-28 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
