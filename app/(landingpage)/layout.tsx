import type { GetServerSideProps, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/app/(landingpage)/style.css"
import StoreProvider from "@/app/StoreProvider";
import { bricolage } from "@/app/(ui)/fonts";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "Vokabeltrainer Spanisch mit Belu",
  description: "Spanisch Vokabeltrainer für Deutschsprachige: Die wichtigsten Wörter nach Themen und Level A1-B2 sortiert!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="de">
      <body className={`${bricolage.className} antialiased bg-white text-black dark:bg-bgColorCardDark dark:text-white`}>
        <ThemeProvider enableSystem={true} attribute="class" defaultTheme="system">
          <StoreProvider>
            {/* <Header /> */}
            {children}
            <SpeedInsights />
            <Analytics />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
