import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from 'next-plausible'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Ease",
  description: "It is an app to add tasks to a calendar that syncs with Google Calendars, in which you can organize your week and scale it to a monthly, quarterly, semi-annual or annual level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlausibleProvider domain='taskease.click' >
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </html>
    </PlausibleProvider>
  );
}
