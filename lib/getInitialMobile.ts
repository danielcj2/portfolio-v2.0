import "server-only";

import { headers } from "next/headers";
import { isLikelyMobileDevice } from "@/lib/device";

export const getInitialMobile = async () => {
  const requestHeaders = await headers();
  const chMobileHeader = requestHeaders.get("sec-ch-ua-mobile");
  const userAgent = requestHeaders.get("user-agent") ?? "";

  return chMobileHeader === "?1" || isLikelyMobileDevice(userAgent);
};
