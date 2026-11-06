import type { NextConfig } from "next";

// Fully static export: deploy the `out/` folder anywhere (Vercel, GitHub Pages, Netlify, S3).
// For GitHub Pages under a repo path, build with NEXT_PUBLIC_BASE_PATH=/your-repo-name.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default config;
