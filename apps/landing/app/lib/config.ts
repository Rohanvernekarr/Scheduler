const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const WEB_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WEB_URL || "https://dashboard.schedulers.app",
);

export const LANDING_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_LANDING_URL || "https://schedulers.app",
);
