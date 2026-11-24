import "./globals.css";

import Script from "next/script";
import Header from "@/navigation/Header";
import Footer from "@/navigation/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import { baseNeue, oxanium } from "@/lib/fonts";
import { MediaQueryProvider } from "@/providers/MediaQueryContext";
import { SmoothScroll } from "@/ui/SmoothScroll";
import { getInitialMobile } from "@/lib/getInitialMobile";

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
    "Daniel Cojocea is a frontend developer based in Toronto, Canada. Have a question or want to get in touch? Feel free to reach out.",
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

const title = "Daniel Cojocea | Portfolio 2026";
const description =
  "Portfolio website of Daniel Cojocea, a frontend developer based in Toronto, Canada. This is a collection of projects, ideas, and things built for the web. Take a look around, and feel free to get in touch.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/" },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Daniel Cojocea Portfolio",
    title,
    description,
    images: [
      {
        url: "/opengraph-image.png",
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
      <body className={`${baseNeue.variable} ${oxanium.variable} antialiased`}>
        <Script id="reload-scroll-restoration" strategy="beforeInteractive">
          {`(() => {
            const navigation = performance.getEntriesByType("navigation")[0];
            if (!navigation || navigation.type !== "reload") return;

            history.scrollRestoration = "manual";
            const resetScroll = () => window.scrollTo(0, 0);
            resetScroll();
            window.addEventListener("load", resetScroll, { once: true });
          })();`}
        </Script>
        <Script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll>
          <MediaQueryProvider initialMobile={initialMobile}>
            <div className="bg-background w-screen">
              <Header />
              <main className="bg-background relative z-0 font-sans">
                {children}
                <Footer />
              </main>
            </div>
          </MediaQueryProvider>
        </SmoothScroll>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
