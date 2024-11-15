import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import MainProvider from "@/components/web3auth/MainProvider";

// Import Lexend font from Google Fonts
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GRANT3D",
  description: "A decentralized crowdfunding platform for educational grants",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} antialiased`}
      >
          <MainProvider>
              {children}
          </MainProvider>
      </body>
    </html>
  );
}
