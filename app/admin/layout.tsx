import type { GetServerSideProps, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/app/globals.css";
import StoreProvider from "@/app/StoreProvider";
import { bricolage } from "@/app/(ui)/fonts";
import { ThemeProvider } from "next-themes";
import Header from "@/app/admin/Header";


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
      <body className={`${bricolage.className} antialiased bg-bgColorLight dark:bg-bgColorDark transition-all duration-500`}>
        <ThemeProvider enableSystem={true} attribute="class">
          <StoreProvider>
            <Header />
            {children}
            <SpeedInsights />
            <Analytics />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
