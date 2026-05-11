const MOBILE_USER_AGENT_REGEX =
  /Android.+Mobile|iPhone|iPod|Opera Mini|IEMobile|BlackBerry|webOS/i;

export const isLikelyMobileDevice = (userAgent: string) => {
  return MOBILE_USER_AGENT_REGEX.test(userAgent);
};
