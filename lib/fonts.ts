import localFont from "next/font/local";
import { Oxanium } from "next/font/google";

export const baseNeue = localFont({
  src: [
    {
      path: "../assets/fonts/BaseNeueTrial-ExtraLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/BaseNeueTrial-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/BaseNeueTrial-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neue",
});

export const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});
