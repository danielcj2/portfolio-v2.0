import "./globals.css";

import Header from "@/navigation/Header";

import type { Metadata } from "next";
import { geistSans, geistMono, chakraPetch } from "@/lib/fonts";
import { LenisProvider } from "@/providers/LenisContext";
import { ScrollProvider } from "@/providers/ScrollContext";
import ScrollWrapper from "@/ui/ScrollWrapper";

export const metadata: Metadata = {
  title: "Daniel Cojocea | Frontend Developer | Portfolio 2026",
  description:
    "Portfolio website of Daniel Cojocea, a Frontend Developer specializing in creating engaging and user-friendly web experiences. Explore my projects, skills, and get in touch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} overflow-hidden antialiased`}
      >
        <LenisProvider>
          <ScrollProvider>
            <Header />
            <ScrollWrapper>{children}</ScrollWrapper>
          </ScrollProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
