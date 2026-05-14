import "./globals.css";

import Header from "@/navigation/Header";
import Script from "next/script";

import type { Metadata } from "next";
import { geistSans, geistMono, chakraPetch } from "@/lib/fonts";
import { getInitialMobile } from "@/lib/getInitialMobile";
import { LenisProvider } from "@/providers/LenisContext";
import { ScrollProvider } from "@/providers/ScrollContext";
import { MediaQueryProvider } from "@/providers/MediaQueryContext";
import ScrollWrapper from "@/ui/ScrollWrapper";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const sameAs = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  process.env.NEXT_PUBLIC_GITHUB_URL,
].filter((url): url is string => Boolean(url));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Cojocea",
  url: siteUrl,
  jobTitle: "Frontend Developer",
  description:
    "Frontend Developer specializing in engaging, user-friendly web experiences.",
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Daniel Cojocea | Frontend Developer | Portfolio 2026",
  description:
    "Portfolio website of Daniel Cojocea, a Frontend Developer specializing in creating engaging and user-friendly web experiences. Explore my projects, skills, and get in touch!",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/en" },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Daniel Cojocea Portfolio",
    title: "Daniel Cojocea | Frontend Developer | Portfolio 2026",
    description:
      "Portfolio website of Daniel Cojocea, a Frontend Developer specializing in creating engaging and user-friendly web experiences. Explore my projects, skills, and get in touch!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniel Cojocea Portfolio",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialMobile = await getInitialMobile();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} overflow-hidden antialiased`}
      >
        <Script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LenisProvider>
          <ScrollProvider>
            <MediaQueryProvider initialMobile={initialMobile}>
              <Header />
              <ScrollWrapper>{children}</ScrollWrapper>
            </MediaQueryProvider>
          </ScrollProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
