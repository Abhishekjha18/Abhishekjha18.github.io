import type { MetadataRoute } from "next";
import { papers, projects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/research/"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/experience/"), lastModified: now, priority: 0.8 },
    { url: absoluteUrl("/about/"), lastModified: now, priority: 0.7 },
    { url: absoluteUrl("/projects/"), lastModified: now, priority: 0.8 },
    ...papers.map((p) => ({ url: absoluteUrl(`/research/${p.slug}/`), lastModified: now, priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}/`), lastModified: now, priority: 0.6 })),
  ];
}
