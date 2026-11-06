# Abhishek Jha — portfolio

A fully static portfolio site (Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript). No backend, no runtime
dependencies beyond React/Next, and no tracking. Everything exports to plain HTML in `out/`.

**Design thesis:** the work falls into three threads — **Verify · Remember · Compress** — so the site is built
around them, with two interactive pieces that *show* them instead of describing them:

- **Verifier demo** (hero) — a model proposes, a deterministic verifier disposes. Modelled on the real systems in
  the *Verified Confinement* paper. Respects `prefers-reduced-motion`.
- **Quantization playground** (on /research) — drag the bit-width from 16 down to 1 and watch a signal degrade, with live
  compression, 1B-parameter size and SNR readouts.

**Information architecture:** the landing page is deliberately short — hero, four headline numbers, "what I work on",
three selected projects, a three-line experience summary and contact. Every section links to a detail page, so
nothing is dumped on the visitor at once: **Research** (threads, papers, quantization playground), **Experience**
(full timeline), **Projects** (all 22, filterable; `/projects/#silicon` deep-links a category) and **About**
(honors, skills, education, beyond the lab).

Also: dark/light theme (no flash), ⌘K / Ctrl-K command palette with topic search, 22 project case studies,
4 paper pages, SEO (metadata, sitemap, robots, OG image, JSON-LD), keyboard + screen-reader friendly.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run typecheck
```

## Edit the content

**Everything lives in one file: [`lib/content.ts`](lib/content.ts)** — papers, experience, projects, honors, skills,
education. Change a number or add a project there and every page, the command palette and the sitemap update.

| To change… | Edit |
| --- | --- |
| Hero line, bio, contact links | `person` in `lib/content.ts` |
| Add a paper / project | push an object onto `papers` / `projects` (a page is generated automatically) |
| Which 3 projects appear on the landing page | the `picks` list in `components/SelectedWork.tsx` |
| One-line role summaries on the landing page | `oneLine` on a role in `experience` |
| Colours, fonts, spacing | tokens at the top of `app/globals.css` |
| Résumé download | replace `public/AbhishekJha_Resume.pdf` |

## Deploy — GitHub Pages (recommended; free, ideal for low traffic)

The built site is ~6 MB of plain files, so Pages' limits (≈1 GB site, ≈100 GB/month bandwidth) are irrelevant here.
Your existing project sites (`/webmcp-memory-bus/`, `/darkroom/`) keep working alongside a root site.

1. Create a **public** repo named exactly `Abhishekjha18.github.io` → the site lives at `https://abhishekjha18.github.io/`.
2. Push **only this `portfolio/` folder** (never its parent — `resume_make/` holds confidential Amazon documents):
   ```bash
   cd portfolio
   git init -b main && git add . && git commit -m "Portfolio"
   git remote add origin git@github.com:Abhishekjha18/Abhishekjha18.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: GitHub Actions.** `.github/workflows/deploy.yml` then builds and
   publishes on every push to `main` (about a minute). Edit `lib/content.ts`, push, done.

Custom domain later? Add it under Settings → Pages, set a repo variable `SITE_URL` to it, and add a `public/CNAME` file.
Any other static host (Vercel, Netlify, Cloudflare Pages) also works — just publish `out/`.

**Before going public:** `public/AbhishekJha_Resume.pdf` is a copy of your master résumé and contains your phone
number. Everything on the site is public once pushed.

| Env var | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG tags | `https://abhishekjha18.github.io` |
| `NEXT_PUBLIC_BASE_PATH` | Only for a project repo served under a sub-path (e.g. `/portfolio`) | _(none)_ |

## Content decisions worth knowing

- **Amazon work is at résumé-level abstraction** — no internal product names, no per-team internal metrics, matching
  how the public résumé already describes it. The autonomous-experimentation framework is described but not named.
- **STARK** is shown as *AAAI-27 · Accepted*; the EMNLP submission is deliberately not mentioned (status unconfirmed).
- **QUARTZ** says "Published · Presented" with no mode (virtual vs. in person), same as the résumés.
- **CGPA is omitted**, per the standing résumé policy.
- **Verified Confinement** is labelled "Accepted" (not "Accepted (Poster)"), matching your 2026-11-06 résumé update.
- **ORCID / Google Scholar** (from `MASTER_PROFILE.md`) and **OpenReview** (listed on your own ORCID record) are linked
  from the Research page, contact section, footer, ⌘K and the page's structured data.
- The unverifiable "IEEE Delhi Section speaker" line is **not** included.
- Items the résumés had dropped but this exhaustive site includes: darkroom, HackPulse, DataLineageEnv, the SLAM-ROS
  testbed, the IoT botany kit, and the leadership/teaching items under “Beyond the lab”.

## Structure

```
app/                  / · /research · /experience · /projects · /about · /projects/[slug] · /research/[slug]
                      + 404 · sitemap · robots · OG image
components/           landing sections, detail-page parts, the two interactives, Nav, CommandPalette
lib/content.ts        all site content (single source of truth)
lib/site.ts           site URL / base-path helpers
public/               résumé PDF
```
