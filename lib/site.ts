// Set NEXT_PUBLIC_SITE_URL to the final deployed origin (used for canonical URLs, sitemap, OG tags).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://abhishekjha18.github.io").replace(/\/$/, "");

// Set NEXT_PUBLIC_BASE_PATH (e.g. "/portfolio") when hosting under a sub-path such as GitHub Pages project sites.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a path to a file in /public so plain <a href> tags work under a base path. */
export const asset = (path: string) => `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

export const absoluteUrl = (path: string) => `${SITE_URL}${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
