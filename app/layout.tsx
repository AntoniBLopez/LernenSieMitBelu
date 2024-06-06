import type { GetServerSideProps, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Header from "@/app/ui/Header";
import StoreProvider from "./StoreProvider";
import { bricolage } from "./ui/fonts";


export const metadata: Metadata = {
  title: "Lernen Sie Mit Belu",
  description: "Lernen Sie Spanisch, indem Sie Aufgaben auf die einfachste, schnellste und einfachste Art und Weise erledigen, die es je gab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${bricolage.className} antialiased`}>
        <StoreProvider>
        <Header />
          {children}
        </StoreProvider>
        <Analytics />
      </body>
    </html >
  );
}
