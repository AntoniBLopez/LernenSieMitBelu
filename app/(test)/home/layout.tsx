import type { GetServerSideProps, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/app/globals.css";
import Header from "@/app/(test)/home/Header";
import StoreProvider from "@/app/StoreProvider";
import { bricolage } from "@/app/(ui)/fonts";


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
    <html lang="de">
      <body className={`${bricolage.className} antialiased`}>
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
