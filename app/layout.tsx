import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Footer from "./footer";

export const metadata: Metadata = {
  title: "Draw Signature",
  description: "Draw Signature Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      <Footer />
      </body>
    </html>
  );
}
