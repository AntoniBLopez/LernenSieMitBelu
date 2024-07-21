import "@/app/globals.css";
import type { GetServerSideProps, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/app/(ui)/Header";
import StoreProvider from "@/app/StoreProvider";
import { bricolage } from "@/app/(ui)/fonts";
// import Breadcrumbs from "@/app/(ui)/widgets/Breadcrumbs";
import Aside from "@/app/(ui)/profile/components/Aside";
import StartButton from "./components/StartButton";


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
          <StartButton />
          <div className="flex flex-row gap-5 mx-6 laptop:mx-auto laptop:max-w-desktop">
            <Aside />
            {children}
          </div>
          <SpeedInsights />
          <Analytics />
        </StoreProvider>
      </body>
    </html >
  );
}
