import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// TODO [] - Geist Mono only used in main heading, worth keeping? also check if google import works for Geist sans, if so can remove package

export const geistSans = GeistSans;
export const geistMono = GeistMono;

export const chakraPetch = localFont({
  src: [
    {
      path: "../assets/fonts/ChakraPetch-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/ChakraPetch-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/ChakraPetch-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ChakraPetch-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/ChakraPetch-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ChakraPetch-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/ChakraPetch-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/ChakraPetch-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/ChakraPetch-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/ChakraPetch-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-chakra",
});
