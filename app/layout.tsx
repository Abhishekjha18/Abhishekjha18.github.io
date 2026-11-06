import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CommandPalette, type PaletteItem } from "@/components/CommandPalette";
import { papers, person, projects } from "@/lib/content";
import { BASE_PATH, SITE_URL } from "@/lib/site";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = "Abhishek Jha — AI/ML researcher";
const description =
  "AI/ML researcher at IIIT Delhi working on verifiable LLM systems, long-horizon agent memory and extreme model quantization. Four 2026 papers (NeurIPS WS, COLM WS, AAAI-27, ISLPED), All India Rank 2 at the GE HealthCare Precision Care Challenge, and a Pre-Placement Offer as Applied Scientist at Amazon.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}${BASE_PATH}/`),
  title: { default: title, template: "%s · Abhishek Jha" },
  description,
  authors: [{ name: person.name, url: person.github }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Abhishek Jha",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0a" },
  ],
};

// Runs before first paint so the saved/system theme never flashes the wrong colours.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "AI/ML researcher",
  url: `${SITE_URL}${BASE_PATH}/`,
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indraprastha Institute of Information Technology, Delhi" },
  identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: person.orcidId },
  sameAs: [person.github, person.linkedin, person.orcid, person.scholar, person.openreview],
  knowsAbout: ["Large language models", "Model quantization", "Agentic AI", "Long-term memory in AI systems", "Reliable AI", "Formal verification", "VLSI"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const paletteItems: PaletteItem[] = [
    { group: "Pages", label: "Research", hint: "papers & threads", href: "/research/" },
    { group: "Pages", label: "Experience", hint: "Amazon · ST · CiPD", href: "/experience/" },
    { group: "Pages", label: "Projects", hint: "all work", href: "/projects/" },
    { group: "Pages", label: "Silicon & embedded projects", hint: "VLSI · hardware", href: "/projects/#silicon", keywords: "vlsi hardware cadence fpga stm32 circuits" },
    { group: "Pages", label: "Honors & awards", hint: "/about", href: "/about/#honors", keywords: "award rank hackathon winner" },
    { group: "Pages", label: "Skills & education", hint: "/about", href: "/about/#skills", keywords: "iiit delhi coursework languages tools" },
    { group: "Pages", label: "Quantization playground", hint: "interactive", href: "/research/#quantization", keywords: "bits compress int8 vector quantization slider" },
    { group: "Pages", label: "Contact", hint: "email", href: "/#contact" },
    ...papers.map((p) => ({
      group: "Papers",
      label: p.short,
      hint: p.venueShort,
      href: `/research/${p.slug}/`,
      keywords: `${p.title} ${p.tldr} ${p.venue} ${p.status}`,
    })),
    ...projects.map((p) => ({
      group: "Projects",
      label: p.title,
      hint: p.year,
      href: `/projects/${p.slug}/`,
      keywords: `${p.tagline} ${p.stack.join(" ")}`,
    })),
    { group: "Links", label: "GitHub", hint: "Abhishekjha18", href: person.github, external: true },
    { group: "Links", label: "LinkedIn", hint: "abhishek-jha", href: person.linkedin, external: true },
    { group: "Links", label: "Google Scholar", hint: "publications", href: person.scholar, external: true, keywords: "citations papers profile" },
    { group: "Links", label: "ORCID", hint: person.orcidId, href: person.orcid, external: true },
    { group: "Links", label: "OpenReview", hint: "papers & reviews", href: person.openreview, external: true },
    { group: "Links", label: "Email", hint: person.email, href: `mailto:${person.email}`, external: true },
  ];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrument.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Nav resume={person.resume} />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette items={paletteItems} />
      </body>
    </html>
  );
}
