import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Chakra_Petch } from "next/font/google";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
});

export const geistSans = GeistSans;
export const geistMono = GeistMono;
export const chakraPetch = chakra;
