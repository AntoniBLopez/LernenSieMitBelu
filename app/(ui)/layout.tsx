import "@/app/globals.css";
import type { GetServerSideProps, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/app/(ui)/Header";
import StoreProvider from "@/app/StoreProvider";
import { bricolage } from "@/app/(ui)/fonts";
import Breadcrumbs from "@/app/(ui)/widgets/Breadcrumbs";


export const metadata: Metadata = {
  title: "Vokabeltrainer mit Belu",
  description: "Spanisch Vokabeltrainer für Deutschsprachige: Die wichtigsten Wörter nach Themen und Level A1-B2 sortiert!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="de">
      <body className={`${bricolage.className} antialiased bg-bgColor`}>
        <StoreProvider>
          <Header />
          {children}
          <SpeedInsights />
          <Analytics />
        </StoreProvider>
      </body>
    </html >
  );
}
