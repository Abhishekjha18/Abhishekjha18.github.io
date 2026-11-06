// Single source of truth for every word on the site.
// Facts come from the résumé knowledge base, the paper/leaderboard screenshots and the live GitHub READMEs.
// Amazon material is kept at the same abstraction level as the public résumé (no internal product names).

export const person = {
  name: "Abhishek Jha",
  short: "AJ",
  role: "AI/ML researcher",
  location: "Delhi, India",
  email: "abhiishekkjha@gmail.com", // double "i" is correct
  github: "https://github.com/Abhishekjha18",
  linkedin: "https://www.linkedin.com/in/abhishek-jha-b3bb17270",
  orcidId: "0009-0005-9169-5606",
  orcid: "https://orcid.org/0009-0005-9169-5606",
  scholar: "https://scholar.google.com/citations?user=SJqRkp0AAAAJ&hl=en",
  openreview: "https://openreview.net/profile?id=~Abhishek_Jha4",
  resume: "/AbhishekJha_Resume.pdf",
  headline: "Verify. Remember. Compress.",
  lede:
    "I'm an AI/ML researcher at IIIT Delhi working on verifiable LLM systems, long-horizon agent memory, and extreme model quantization — the three things that decide whether a model can be trusted, can learn, and can actually ship.",
  status: "Pre-Placement Offer · Applied Scientist, Amazon",
};

export type ThreadId = "verify" | "remember" | "compress";

export const threads: {
  id: ThreadId;
  verb: string;
  line: string;
  body: string;
}[] = [
  {
    id: "verify",
    verb: "Verify",
    line: "AI where uncertain, arithmetic where known.",
    body:
      "Confine the model to a narrow generative surface and let an independent, deterministic verifier decide what is trusted. Self-report alone accepted 33–67% of wrong outputs in my case study.",
  },
  {
    id: "remember",
    verb: "Remember",
    line: "Agents that actually learn from yesterday.",
    body:
      "Dual-graph memory — episodic events plus an evidence-scored insight graph — that keeps retrieval flat at ~3.8K tokens however long the history grows.",
  },
  {
    id: "compress",
    verb: "Compress",
    line: "Make it small enough to run where it matters.",
    body:
      "Vector quantization, lookup-table attention and integer-only compute-in-memory periphery: 5-bit YOLOv5s at 6.4× compression, a 7.4× cut in KV-cache read bandwidth.",
  },
];

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export const stats: {
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  sub: string;
}[] = [
  { value: 4, label: "Papers in 2026", sub: "NeurIPS WS · COLM WS · AAAI-27 · ISLPED" },
  { prefix: "AIR ", value: 2, label: "GE HealthCare Precision Care Challenge", sub: "of 8,000+ teams · Grand Finale, Oct 2026" },
  { prefix: "AIR ", value: 3, label: "Amazon ML Challenge 2025", sub: "of 20,000+ teams" },
  { value: 6.4, decimals: 1, suffix: "×", label: "YOLOv5s compression", sub: "at 5-bit, 3.3% accuracy drop" },
];

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export type Paper = {
  slug: string;
  title: string;
  short: string;
  year: string;
  venue: string;
  venueShort: string;
  status: string;
  thread: ThreadId;
  authors: string[];
  tldr: string;
  summary: string[];
  points: string[];
  link?: { label: string; href: string };
  doi?: string;
  related?: string[]; // project slugs
};

export const papers: Paper[] = [
  {
    slug: "verified-confinement",
    title: "Verified Confinement: A Case-Study Pattern for Confining LLM Output Behind Deterministic Verifiers",
    short: "Verified Confinement",
    year: "2026",
    venue: "NeurIPS 2026 Workshop on AI for Verifiable Coding (VERICODEGEN)",
    venueShort: "NeurIPS 2026 WS",
    status: "Accepted",
    thread: "verify",
    link: { label: "OpenReview", href: "https://openreview.net/forum?id=xfaU34ds1r" },
    authors: ["Aniket Gupta", "Abhishek Jha", "Shreyashi Binod Kumar", "Angadjeet Singh", "Harsh Kumar"],
    tldr:
      "A case-study pattern for confining LLM output behind independent verifiers; self-report alone accepts 33–67% of wrong outputs.",
    summary: [
      "LLM code assistants — and LLM-integrated systems more broadly — are hard to trust because nothing in their construction stops a hallucinated answer from being treated as a correct one. We report a case study of real systems (a spreadsheet auditor, a government-record filing assistant, an LLM-in-the-loop cross-language code-porting pipeline, and a Dafny generate/verify/repair loop) that converged on the same architecture.",
      "That architecture has four parts: a narrow generative surface the model is confined to, a deterministic verifier that checks an artifact independent of the model's self-report, non-authoritative typing that makes unverified output structurally impossible to mistake for verified, and a defined failure or degradation mode. We call it Verified Confinement. It is close kin to test-driven automated program repair, but recurs even outside code.",
      "We state plainly what this is not: no machine-checked proof, and no claim of novelty. It is convergent design within one team's practice — and reporting negative results alongside positive ones, precisely, is itself the contribution.",
    ],
    points: [
      "Self-certification — the model drafts once and certifies itself without seeing the verifier's verdict — puts false-acceptance at 33–67%, worst exactly where verification matters most.",
      "A frontier model (Claude Sonnet 5) closes the gap entirely on proof-repair (0/24 vs. 44.4%), substantially on the spreadsheet auditor (1/15 vs. 10/15), but not on the filing system (6/18, 33.3%): whether it closes depends on why the gap exists, not on model scale.",
      "The Dafny loop fixes 17 of 24 real bugs against a validated 29-mutation catalog — after the harness caught and fixed a real false positive in itself (an empty reply trivially “verifies”).",
      "An anti-hallucination gate caught all 3 spontaneous fabrications with zero false positives across 54 trials.",
      "Negative results are reported too: a direct-prompt baseline, a reasoning-effort tuning tension, and a k-sample self-consistency check that closed no gap.",
    ],
    related: ["buy-or-wait", "claimcast", "agent-memory-bus"],
  },
  {
    slug: "quartz",
    title: "QUARTZ: Dequantization-Free LLM Attention via Lookup Tables",
    short: "QUARTZ",
    year: "2026",
    venue: "COLM 2026 Workshop on Efficient Reasoning",
    venueShort: "COLM 2026 WS",
    status: "Published · Presented",
    thread: "compress",
    link: { label: "OpenReview", href: "https://openreview.net/forum?id=r0HQW22amT" },
    authors: ["Angadjeet Singh", "Parth Sandeep Rastogi", "Abhishek Jha", "Mridupawan Das", "Surinder Pal Singh"],
    tldr:
      "A calibration-free product-quantization codebook that removes the KV-cache dequantization bottleneck — 7.4× lower read bandwidth than FP16, near-lossless long-context accuracy.",
    summary: [
      "Long-context decoding is bound by memory bandwidth: every generated token re-reads the whole KV cache. Quantizing that cache saves bytes, but dequantizing it on the way into attention hands the savings straight back.",
      "QUARTZ removes the dequantization step. A calibration-free, analytical product-quantization (PQ) codebook lets attention scores be computed with lookup tables over the quantized codes directly, so the cache is never expanded back to floating point.",
    ],
    points: [
      "7.4× read-bandwidth reduction versus FP16 attention.",
      "Near-lossless on RULER-style long-context evaluation with Qwen2.5-3B and TinyLlama-1.1B.",
      "100% passkey retrieval.",
      "Calibration-free: the codebook is analytical, so there is no calibration set to curate or leak.",
    ],
  },
  {
    slug: "stark",
    title: "STARK: Moving Towards Agents That Truly Learn and Remember",
    short: "STARK",
    year: "2026",
    venue: "AAAI-27",
    venueShort: "AAAI-27",
    status: "Accepted",
    thread: "remember",
    authors: ["Aryan Jain", "Abhishek Jha", "Anish Nediyanchath", "Promod Yenigalla"],
    tldr:
      "A dual-graph long-horizon memory architecture: +1.48 on LongMemEval and +0.93 on LoCoMo over prior state of the art, with cross-user transfer.",
    summary: [
      "Most agent memory either stuffs history into the context window or retrieves flat snippets, and both degrade as the history grows. STARK keeps two linked graphs: an episodic graph of what happened, and an insight graph of evidence-scored behavioural signals distilled from those events.",
      "Retrieval is query-driven and bounded, so the context handed to the model stays flat at roughly 3.8K tokens regardless of how much history exists. Insights can also be shared across users without exposing anyone's raw history, which helps cold-start users.",
    ],
    points: [
      "+1.48 on LongMemEval information extraction and +0.93 on LoCoMo open-domain QA over the prior state of the art, against Mem0, ZEP and MAGMA baselines.",
      "Cross-user transfer improves open-ended judge scores by 0.75 and accuracy by 7% at 5% graph sparsity.",
      "Retrieval stays flat at ~3.8K tokens regardless of history length.",
    ],
    related: ["agent-memory-bus"],
  },
  {
    slug: "cim-flex",
    title: "CIM-FLEX: An Integer-Only Flexible Periphery for Distributed Compute-In-Memory Architectures",
    short: "CIM-FLEX",
    year: "2026",
    venue: "ISLPED 2026 (ACM/IEEE International Symposium on Low Power Electronics and Design)",
    venueShort: "ISLPED 2026",
    status: "Published",
    thread: "compress",
    doi: "10.1145/3816440.3818582",
    link: { label: "ACM Digital Library", href: "https://doi.org/10.1145/3816440.3818582" },
    authors: [
      "Irem Sanli",
      "Michele Rossi",
      "Elena Ferro",
      "Abhishek Jha",
      "Andreas Burg",
      "Surinder Pal Singh",
      "Thomas Boesch",
      "Irem Boybat",
    ],
    tldr:
      "An integer-only, flexible periphery for distributed compute-in-memory — a collaboration between STMicroelectronics, IBM Research and EPFL.",
    summary: [
      "My first peer-reviewed, DOI-bearing publication. It grew directly out of the deep-learning quantization research I did as an intern at STMicroelectronics, working with a team spanning ST, IBM and EPFL.",
      "Compute-in-memory moves arithmetic into the memory array, but the analog array is only as useful as the periphery around it. CIM-FLEX makes that periphery integer-only and flexible, so quantized networks map onto distributed CIM tiles without floating-point hardware.",
    ],
    points: [
      "Published at ISLPED 2026 — DOI 10.1145/3816440.3818582.",
      "Co-authored with researchers at STMicroelectronics, IBM Research and EPFL.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Role = {
  org: string;
  place?: string;
  title: string;
  dates: string;
  oneLine?: string;
  blurb?: string;
  points: string[];
  more?: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    org: "Amazon",
    place: "RBS Tech Sciences",
    title: "Applied Science Intern → Pre-Placement Offer, Applied Scientist",
    dates: "Jan 2026 – Jun 2026",
    oneLine: "Long-horizon agent memory — became the AAAI-27 paper STARK and a full-time Applied Scientist offer.",
    blurb: "Agentic AI & ML systems. The internship converted into a full-time Applied Scientist offer.",
    points: [
      "Designed and implemented scalable memory services for long-horizon agentic systems, keeping retrieval flat at ~3.8K tokens regardless of history length across multi-step workflows.",
      "Built a dual-graph memory architecture (episodic events + an evidence-scored insight graph) with cross-user knowledge transfer, outperforming Mem0, ZEP and MAGMA baselines by up to 1.48 points on long-horizon information extraction and 0.93 points on multi-hop open-domain QA. This became the AAAI-27 paper STARK.",
      "Engineered an autonomous ML-experimentation framework that automates research cycles from problem formulation through evaluation; validated across multiple teams with up to 28% latency reduction at zero accuracy loss.",
      "Two research posters accepted at Amazon's internal EdgeAI Science Summit (Feb 2026). Recognised with the Init-Together Award at the RBS All-Hands, Q1 2026.",
    ],
    tags: ["Python", "LangChain", "Transformers", "Agentic systems", "Graph memory"],
  },
  {
    org: "STMicroelectronics",
    place: "Systems Research & Applications",
    title: "Deep Learning Quantization Research Intern",
    dates: "Jun 2025 – Dec 2025",
    oneLine: "Vector-quantization research that became CIM-FLEX (ISLPED) and QUARTZ (COLM WS).",
    blurb: "Official project title: “Deep Learning compression and quantization.” This work fed directly into CIM-FLEX (ISLPED 2026) and QUARTZ (COLM 2026 WS).",
    points: [
      "Implemented 10+ quantization techniques — including Channel Relaxed Vector Quantization (CRVQ), VQ, PCDVQ and RVQ — across CNNs, LSTMs and Transformers for memory-efficient edge deployment.",
      "Quantized YOLOv5s to 5-bit (6.4× compression) with hardware-friendly Vector Quantization plus Sparse Error Compensation, at a 3.3% relative accuracy drop.",
      "Applied CRVQ to a Vision Transformer: 32-bit → 5.2-bit (6.12× compression) with a 0.83% relative accuracy drop, using Adam-optimised codebook fine-tuning.",
      "Quantized OpenAI CLIP to int8 through Qualcomm AI Hub for multi-modal edge deployment (smart retail, visual search, HMI).",
      "Wrote a custom int8 SiLU layer as a TensorFlow custom op (built with Bazel) for a joint IBM × ST TFLite activation-testing project.",
    ],
    more: [
      "Built piecewise-linear-approximation (PLA) and LUT-based approximators for SiLU, GeLU, Sigmoid and ReLU — a 40% reduction in computational overhead.",
      "Applied DeepCABAC sparse-model compression to cut embedded-AI memory footprint.",
      "Built a reference quantized-model zoo (YOLOv5n, EfficientViT-SAM) for ST EdgeAI.",
      "Researched BLIP / vision-language-model quantization for multi-modal edge deployment.",
    ],
    tags: ["PyTorch", "Vector quantization", "TFLite", "TensorFlow custom ops", "Bazel", "Qualcomm AI Hub"],
  },
  {
    org: "CiPD, IIIT Delhi",
    place: "Centre for Intelligent Product Development",
    title: "Software and Product Development Intern",
    dates: "May 2024 – May 2025",
    oneLine: "Custom STM32 boards and a full-stack IoT system — three products launched.",
    points: [
      "Coordinated 7+ cross-functional teams and launched 3 IoT products.",
      "Designed custom STM32 expansion boards and a custom microcontroller board with four interchangeable shields; configured peripherals in STM32CubeMX.",
      "Built a full-stack IoT system — STM32 sensors plus a cloud backend — reaching 99.3% accuracy on real-time processing of 780K+ datapoints.",
    ],
    tags: ["STM32", "CubeMX", "IoT", "Embedded C", "Cloud backend"],
  },
  {
    org: "VLSI Circuits & Systems Lab, IIIT Delhi",
    title: "Research Intern",
    dates: "Dec 2024 – Jan 2025",
    points: [
      "IoT-based HVAC fault detection on the ST AIoT platform using ASHRAE data; a Binary Decision Tree reached >95% anomaly-detection accuracy and a 3× reduction in equipment-damage risk.",
    ],
    tags: ["ST AIoT", "Decision trees", "Anomaly detection"],
  },
  {
    org: "NAS Lab · Infosys Center for AI, IIIT Delhi",
    title: "Independent Project",
    dates: "May 2024 – Jul 2024",
    points: [
      "Built an automated SLAM-ROS testbed on an NVIDIA Jetson / JetRacer robot, fusing LiDAR, IMU and camera data to validate autonomous-vehicle algorithms.",
    ],
    tags: ["ROS", "SLAM", "NVIDIA Jetson", "Sensor fusion"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type CategoryId = "agents" | "ml" | "systems" | "silicon";

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "agents", label: "AI systems & agents", blurb: "LLMs behind verifiers, agent memory, RL environments" },
  { id: "ml", label: "Applied ML", blurb: "Competition and research-grade modelling" },
  { id: "systems", label: "Software & tools", blurb: "Full-stack products, apps and systems code" },
  { id: "silicon", label: "Silicon & embedded", blurb: "VLSI, analog, firmware and hardware-in-the-loop" },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  category: CategoryId;
  featured?: boolean;
  badge?: string;
  stack: string[];
  summary: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  role?: string;
  note?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "agent-memory-bus",
    title: "Agent Memory Bus",
    tagline: "Cross-session memory for browser agents, over WebMCP.",
    year: "2026",
    category: "agents",
    featured: true,
    badge: "Live demo",
    stack: ["JavaScript", "WebMCP", "IndexedDB", "transformers.js", "Chrome extension"],
    summary:
      "Every agent conversation starts cold, even though your browser holds enormous context — what you've read, decided and noticed. Agent Memory Bus is a WebMCP site an agent can visit mid-task to store and retrieve that context, backed by a dual-graph memory model that runs entirely client-side.",
    highlights: [
      "Dual-graph memory — episodic observations plus a semantic concept graph — inspired by the STARK architecture, persisted in IndexedDB with nothing sent to a server.",
      "Six agent-callable tools over WebMCP: store_observation, retrieve_relevant, get_working_memory, link_concepts, summarize_context and explore_concepts.",
      "Semantic search with embeddings computed in the tab (transformers.js, all-MiniLM-L6-v2): zero server and zero API cost, ~25 MB of model weights cached after first load.",
      "Treats memory as an attack surface. Stored observations are a stored indirect prompt-injection path, so hidden codepoints are stripped at write time, injection-shaped content is flagged in the UI, replayed text is wrapped in <untrusted-user-content>, and a written threat model says what is deliberately not claimed.",
      "A companion browser extension lifts WebMCP's per-tab scoping: it registers the same six tools on every page and forwards each call to one shared store, so one memory stays inspectable and deletable in one place.",
      "194 unit tests plus a real-stack integration suite; CI runs lint and tests and only a green run on main publishes to GitHub Pages.",
    ],
    metrics: [
      { value: "6", label: "agent tools" },
      { value: "194", label: "unit tests" },
      { value: "0", label: "servers" },
    ],
    role: "Solo build. Built with Codex, per the repository README.",
    links: [
      { label: "Live app", href: "https://abhishekjha18.github.io/webmcp-memory-bus/" },
      { label: "GitHub", href: "https://github.com/Abhishekjha18/webmcp-memory-bus" },
    ],
  },
  {
    slug: "claimcast",
    title: "ClaimCast",
    tagline: "What your insurance will actually pay — before you're admitted, not after you're discharged.",
    year: "2026",
    category: "agents",
    featured: true,
    badge: "All India Rank 2",
    stack: ["TypeScript", "Postgres", "Prisma", "XGBoost", "RAG", "Python"],
    summary:
      "An insurance-claim transparency tool built by Team Rocket (4, IIIT Delhi) for the GE HealthCare Precision Care Challenge 2026. It runs the insurer's own adjudication arithmetic — room-rent sub-limits, proportionate deduction, co-pays, IRDAI non-payable items — at each of five decision points in a patient's care journey, with every deduction cited to the policy clause that produced it. Ranked 2nd of 8,000+ teams at the Grand Finale on 1 Oct 2026.",
    highlights: [
      "“AI where uncertain, arithmetic where known — the LLM never decides the money.” A deterministic engine (no I/O, no framework) does all money math.",
      "The LLM only reads unstructured policy documents (TF-IDF retrieval, extraction prompted to quote rather than paraphrase), and every extracted quote is verified to appear in the source text before it is trusted. Unverified extractions are flagged, never silently accepted.",
      "XGBoost quantile regression (p10 / p50 / p90) for cost forecasting, trained on ~1,900 PM-JAY and CGHS tariff rows.",
      "Every branch of the care path is a full re-adjudication, so the rupee figure under it is what would actually be paid on that path.",
      "A build gate (`npm run check`) re-derives the submitted deck's figures from the engine and fails the build if they disagree.",
      "Datasets are synthetic: no real hospital, insurer, patient or bill appears anywhere, and every priced row carries a queryable provenance caveat.",
    ],
    metrics: [
      { value: "2", label: "All India Rank" },
      { value: "8,000+", label: "teams" },
      { value: "5", label: "decision points" },
    ],
    role:
      "Team of four (Aniket Gupta, Abhishek Jha, Shreyashi Kumar, Harsh Kumar). I wrote the demo pitch script and flow, and did hands-on primary-source fact-checking — verifying scheme eligibility claims and regulatory citations against the actual government press note and IRDAI regulation text. 17 commits.",
    note: "Repository lives under a teammate's account.",
    links: [{ label: "GitHub", href: "https://github.com/aniket-3001/ClaimCast" }],
  },
  {
    slug: "buy-or-wait",
    title: "Buy or Wait?",
    tagline: "A deterministic financial-safety agent: a narrow LLM behind a byte-reproducible decision engine.",
    year: "2026",
    category: "agents",
    featured: true,
    stack: ["Python", "Vision OCR", "Gemini", "Claude Sonnet 5"],
    summary:
      "Given “Can I afford this laptop?”, the agent reconstructs a user's financial state from transaction history, messages and scanned documents, runs a 90-day cash-flow safety check, and recommends paying in full, partially, by instalments, waiting, or not proceeding — with a written explanation for every decision.",
    highlights: [
      "A design choice, not a limitation: the task fully specifies the decision procedure, so an agent loop would only add a stochastic approximation of arithmetic that can be computed exactly. The model reads payslip images and turns free-text messages into structured facts; everything downstream is exact.",
      "LLM input is treated as untrusted data — prompts extract objective facts only and never follow instructions embedded in the content.",
      "A validation pass runs before anything is written; on any violation the run aborts non-zero and writes nothing. Verified by fault injection: ten deliberately malformed rows, each caught.",
      "Byte-for-byte reproducible output, with every LLM call cached by content hash so reruns on unchanged data make zero API calls.",
      "A running engineering log records every tuning decision, bugs found by large-N statistical audits (one affected 130 of 250 evaluation requests), rejected hypotheses, and a documented A/B between Gemini and Claude Sonnet 5 as the extraction backend.",
      "Known limitations are written down plainly rather than hidden.",
    ],
    metrics: [
      { value: "10/10", label: "faults caught" },
      { value: "130/250", label: "requests hit by a bug" },
      { value: "0", label: "API calls on rerun" },
    ],
    role: "Solo build.",
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/hackerrank-buy-or-wait-solution" }],
  },
  {
    slug: "darkroom",
    title: "darkroom",
    tagline: "Point it at a folder of photos. Browse them from your phone. It finds the duplicates. Zero dependencies.",
    year: "2026",
    category: "systems",
    featured: true,
    badge: "Rust · 0 deps",
    stack: ["Rust", "WebAssembly", "HTTP", "Perceptual hashing"],
    summary:
      "A local-first photo browser and near-duplicate finder where `[dependencies]` in Cargo.toml is empty. The JPEG decoder, PNG codec, DEFLATE, EXIF parser, perceptual hash, QR generator and the HTTP server that serves it all live in the repository, not on crates.io.",
    highlights: [
      "Decodes JPEG (baseline and progressive), PNG and GIF from scratch, and reads EXIF in both TIFF byte orders plus HEIC container metadata.",
      "Timeline grouped by the date a photo was taken (from EXIF), not the date the file sits at on disk.",
      "From-scratch perceptual hashing clusters the same shot at a different resolution, crop or re-encode. Nothing is ever deleted: darkroom marks a keeper per cluster and reports the bytes you'd reclaim.",
      "A pairing page with a real QR code gets a phone onto the timeline without typing an IP address; switching folders is guarded so only the host machine can do it.",
      "Its QR encoder is compiled to WebAssembly and runs live in the browser as a playground — the same code the CLI uses.",
    ],
    metrics: [
      { value: "0", label: "dependencies" },
      { value: "456", label: "tests" },
      { value: "~13.5k", label: "lines of Rust" },
    ],
    role: "Solo build.",
    links: [
      { label: "Live playground", href: "https://abhishekjha18.github.io/darkroom/" },
      { label: "GitHub", href: "https://github.com/Abhishekjha18/darkroom" },
    ],
  },
  {
    slug: "hackpulse",
    title: "HackPulse",
    tagline: "A self-hosted, API-first hackathon portal — registration through certificates.",
    year: "2026",
    category: "systems",
    featured: true,
    stack: ["Next.js", "NestJS", "Fastify", "Postgres", "Drizzle", "BullMQ", "Redis", "Docker"],
    summary:
      "One `docker compose up` brings up Postgres, Redis, the API and the web app, and takes a hackathon from registration all the way to certificates with no cloud account and no external services.",
    highlights: [
      "A five-role model (visitor, participant, judge, organizer, admin) enforced by the backend, not just hidden in the UI; a person can hold different roles on different events.",
      "Judging two ways: weighted rubric scoring with per-judge normalization, or head-to-head pairwise comparison ranked with a Bradley–Terry model — whichever an organizer picks per event.",
      "A tamper-evident, hash-chained audit log with a public verification endpoint, plus a restricted runtime database role that cannot tamper with it even if the application were compromised.",
      "Signed webhooks, PDF certificates with publicly verifiable judge-participation records, an embeddable gallery widget, and CSV/JSON export-import including a round-tripping full event archive.",
      "Ships with a threat model naming each attack and what honestly does not stop it, and a step-by-step verification guide so every claim can be independently checked.",
    ],
    metrics: [
      { value: "5", label: "roles" },
      { value: "2", label: "judging methods" },
      { value: "1★", label: "on GitHub" },
    ],
    role: "Solo build.",
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/hackpulse" }],
  },
  {
    slug: "datalineage-env",
    title: "DataLineageEnv",
    tagline: "An OpenEnv reinforcement-learning environment for agents that trace data lineage.",
    year: "2026",
    category: "agents",
    stack: ["Python", "PPO", "OpenEnv", "Docker"],
    summary:
      "A structured, strictly graded environment for training and evaluating LLM agents on data-lineage tracking across synthetic enterprise pipelines — the sort of work M&A due diligence and GDPR / CCPA / HIPAA audits depend on.",
    highlights: [
      "Three difficulty tiers: linear pipelines with 1–2 sources; branching pipelines with JOIN / FILTER / AGGREGATE semantics and a quality issue; and enterprise-scale graphs with 5–15 sources, 8–30 transformations, 3–8 sinks, 50–80 edges and 3–5 quality issues inside a 150–200-step budget.",
      "Deterministic grading against expert ground truth: 0.25 × source accuracy + 0.30 × transform accuracy + 0.30 × edge accuracy + 0.15 × quality detection.",
      "Penalties for misidentified nodes (−0.02), invalid edges (−0.015) and duplicate actions (−0.005), so agents must be both thorough and precise.",
      "Framed as a genuine sequential-decision problem — exploration vs. exploitation, partial observability, credit assignment — rather than one-shot classification.",
      "Ships a PPO training pipeline and a multi-model inference harness, backed by a 57-test suite at 95% coverage.",
    ],
    role: "Solo build.",
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/data-lineage-tracker" }],
  },
  {
    slug: "amazon-ml-challenge",
    title: "Amazon ML Challenge 2025",
    tagline: "All India Rank 3 of 20,000+ teams — multi-modal product price prediction.",
    year: "2025",
    category: "ml",
    badge: "All India Rank 3",
    stack: ["PyTorch", "DeBERTa-large-v3", "Cross-attention", "UMAP"],
    summary:
      "A hybrid deep-learning model that fuses DeBERTa-large-v3's [CLS] embedding with engineered product-attribute features through cross-attention, built by a team of four (Team Rocket).",
    highlights: [
      "Two-stream architecture: pretrained language understanding enriched with domain-specific attributes — quality indicators (organic, gourmet, gluten-free), text structure, and packaging characteristics such as bulk size and unit type.",
      "log(price) was approximately Gaussian, so training used log(price + 1) with predictions recovered via exp(pred) − 1.",
      "CLIP image embeddings were evaluated and then dropped: UMAP clustering showed the clusters were inconsistent with price, so the final model is text-only.",
      "SMAPE 39.83 on validation and 40.329 on test — about 5% better than baseline.",
    ],
    metrics: [
      { value: "3", label: "All India Rank" },
      { value: "20,000+", label: "teams" },
      { value: "40.33", label: "test SMAPE" },
    ],
    role: "Team of four: Parth Rastogi, Angadjeet Singh, Abhishek Jha, Harsh Kumar.",
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Amazon-ML-Challenge-2025-3rd" }],
  },
  {
    slug: "traffic-violation-detection",
    title: "Traffic Violation Detection",
    tagline: "Helmet-violation detection and number-plate recognition from surveillance video.",
    year: "2025",
    category: "ml",
    stack: ["PyTorch", "YOLOv8", "OCR", "OpenCV", "Streamlit"],
    summary:
      "A two-stage deep-learning pipeline — YOLOv8 for detection, OCR for plate reading — wrapped in a Streamlit front end, with a systematic study of how detection quality shifts under lighting, blur and contrast.",
    highlights: [
      "98.8% precision and 0.709 mAP@[.50:.95] on real-world footage.",
      "Condition analysis via k-means clustering over lighting, blur and contrast identified up to a 13% mAP improvement in well-lit, low-contrast conditions.",
      "End-to-end: video in, violation plus plate text out.",
    ],
    metrics: [
      { value: "98.8%", label: "precision" },
      { value: "0.709", label: "mAP@[.50:.95]" },
      { value: "13%", label: "mAP gain found" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/traffic_rules_helmet" }],
  },
  {
    slug: "mental-health-summarizer",
    title: "Relevance-Guided Mental-Health Summarization",
    tagline: "Counselling-session summaries steered by sentiment and PHQ-9 clinical cues.",
    year: "2025",
    category: "ml",
    stack: ["RoBERTa", "Flan-T5", "Hugging Face", "ROUGE", "BERTScore"],
    summary:
      "RoBERTa sentiment analysis combined with PHQ-9 clinical cues guides a fine-tuned Flan-T5 to summarise therapist–client conversations, trained on 190 counselling sessions.",
    highlights: [
      "Dialogues restructured into per-utterance records carrying speaker, dialogue function, sub-topic and emotion, plus a global emotion score per conversation.",
      "190 sessions split 131 / 21 / 39 for train / validation / test.",
      "ROUGE-1 39.3, ROUGE-2 15.3 and BERTScore 87.1 — ahead of T5 and Pegasus baselines.",
    ],
    metrics: [
      { value: "39.3", label: "ROUGE-1" },
      { value: "87.1", label: "BERTScore" },
      { value: "190", label: "sessions" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Psychological_Health_Summarizer" }],
  },
  {
    slug: "license-metric",
    title: "License-Metric",
    tagline: "AI-enabled driver evaluation on a MEMS sensor box. Winner, ST AIoT Craft Design Contest 2025.",
    year: "2025",
    category: "silicon",
    badge: "1st Rank",
    stack: ["STEVAL-MKBOXPRO", "LSM6DSV16X", "Decision trees", "TypeScript", "ST AIoT Craft"],
    summary:
      "A device that assesses driving performance in real time from accelerometer and gyroscope data, giving drivers objective, data-driven feedback. Built on the STEVAL-MKBOXPRO with a Binary Decision Tree trained on real driving data, a web dashboard, and a custom laser-cut enclosure.",
    highlights: [
      "780,000+ sensor datapoints recorded across 30 driving sessions.",
      "Decision-tree accuracy rose from 76% to 98–99.3% using Recursive Feature Elimination and Sequential Feature Selection.",
      "Wi-Fi and Bluetooth link to the ST-BLE app and ST AIoT Craft; the web dashboard has login, per-session history and cross-session analytics of driving behaviour.",
      "Winner (1st Rank) at the ST AIoT Craft Design Contest 2025.",
    ],
    metrics: [
      { value: "780K+", label: "datapoints" },
      { value: "99.3%", label: "peak accuracy" },
      { value: "76→99%", label: "after RFE + SFS" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/License-Metric" }],
  },
  {
    slug: "hvac-fault-detection",
    title: "HVAC Fault Detection",
    tagline: "IoT anomaly detection for building HVAC on the ST AIoT platform.",
    year: "2025",
    category: "silicon",
    stack: ["ST AIoT", "ASHRAE data", "Decision trees", "Python"],
    summary:
      "An IoT-based HVAC fault-detection system built at the VLSI Circuits & Systems Lab using the ST AIoT platform and ASHRAE data.",
    highlights: [
      "Binary Decision Tree model with >95% anomaly-detection accuracy.",
      "A 3× reduction in equipment-damage risk.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/HVAC-FAULT-DETECTION" }],
  },
  {
    slug: "electronic-ticketing-machine",
    title: "Electronic Ticketing Machine — RTL to GDS",
    tagline: "A complete digital VLSI flow, from Verilog FSM to signed-off layout.",
    year: "2024",
    category: "silicon",
    stack: ["Verilog", "Cadence Genus", "Cadence Innovus", "Conformal", "Tempus"],
    summary:
      "A full RTL-to-GDS implementation of an electronic ticketing machine: FSM design in Verilog, logic synthesis, place-and-route, formal equivalence checking and static timing analysis.",
    highlights: [
      "Synthesis in Cadence Genus and place-and-route in Cadence Innovus.",
      "Formal verification with Conformal and static timing analysis with Tempus.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Abhishekjha18/VLSI-DESIGN-FLOW-ELECTRONIC_TICKETING_MACHINE",
      },
    ],
  },
  {
    slug: "oai321-logic-gate",
    title: "OAI321 Custom Logic Gate",
    tagline: "A full-custom analog/digital cell, laid out and signed off in Virtuoso.",
    year: "2024",
    category: "silicon",
    stack: ["Cadence Virtuoso", "Monte Carlo", "DRC/LVS"],
    summary:
      "Design of an OAI321 logic gate in Cadence Virtuoso, with floor-planning and place-and-route, under the guidance of Dr. Anuj Grover.",
    highlights: [
      "DRC- and LVS-clean layout at roughly 7–8 µm².",
      "Monte Carlo PVT simulations to characterise robustness across process, voltage and temperature.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Digital-VLSI-Design-OAI321" }],
  },
  {
    slug: "sram-decoder",
    title: "SRAM Pre-Decoder & Column Decoder",
    tagline: "65 nm memory peripheral design with timing, power and PVT analysis.",
    year: "2025",
    category: "silicon",
    stack: ["Cadence Virtuoso", "65 nm", "Monte Carlo", "LVS/DRC"],
    summary:
      "Design of the pre-decoder and column decoder for an SRAM in a 65 nm process, guided by Dr. Anuj Grover.",
    highlights: [
      "Timing and power analysis across Monte Carlo PVT simulations.",
      "Pre- and post-layout LVS and DRC verification.",
    ],
  },
  {
    slug: "sonar-and-transformer",
    title: "SONAR & Transformer Circuits",
    tagline: "A narrowband ultrasonic Doppler SONAR sensor and an analog transformer circuit.",
    year: "2024",
    category: "silicon",
    stack: ["EagleCAD", "KiCad", "Analog design", "PCB"],
    summary:
      "A narrowband ultrasonic Doppler SONAR sensor and a transformer circuit, taken through PCB layout in EagleCAD and KiCad. Guided by Dr. Shobha Sundar Ram and Dr. Pragya Kosta.",
    highlights: ["Sep 2023 – Aug 2024; hardware designed, laid out and tested end to end."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/SONAR-AND-TRANSFORMER" }],
  },
  {
    slug: "custom-stm32-board",
    title: "Custom STM32 Board",
    tagline: "A custom microcontroller board that takes four interchangeable shields.",
    year: "2024",
    category: "silicon",
    stack: ["STM32", "STM32CubeMX", "KiCad", "Firmware"],
    summary:
      "A custom-designed microcontroller board with optimised hardware interfaces and firmware, developed with CubeMX at CiPD. It supports four interchangeable shields at once for diverse sensing and control applications.",
    highlights: ["Part of the CiPD internship that launched 3 IoT products."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Custom_STM_MCU" }],
  },
  {
    slug: "slam-ros-testbed",
    title: "SLAM-ROS Autonomous Testbed",
    tagline: "A Jetson/JetRacer robot for validating autonomous-vehicle algorithms.",
    year: "2024",
    category: "silicon",
    stack: ["ROS", "NVIDIA Jetson", "LiDAR", "IMU", "SLAM"],
    summary:
      "An automated SLAM-ROS testbed on an NVIDIA Jetson-powered JetRacer robot at the NAS Lab (Infosys Center for AI), with LiDAR, IMU and camera sensor fusion.",
    highlights: ["Advisor: Dr. Sanjit K. Kaul. May – Jul 2024."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/my_bot" }],
  },
  {
    slug: "iot-botany-kit",
    title: "Smart IoT Botany STEM Kit",
    tagline: "A plant-monitoring kit that teaches kids IoT.",
    year: "2023",
    category: "silicon",
    stack: ["NodeMCU", "Blynk", "C++", "Laser-cut MDF"],
    summary:
      "An IoT plant-monitoring kit for children on a NodeMCU with the Blynk app and a laser-cut MDF enclosure, guided by Prof. Alok Mittal.",
    highlights: ["Hardware, firmware and enclosure all built in-house."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Plant_Monitoring_System" }],
  },
  {
    slug: "syncwell",
    title: "SyncWell",
    tagline: "An offline-first Android health and wellness tracker.",
    year: "2024",
    category: "systems",
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "Firebase", "Room"],
    summary:
      "A health and wellness tracking app for task management, medication tracking and wellness monitoring, built with Jetpack Compose and Material3 on an MVVM architecture.",
    highlights: [
      "Firebase backend with offline-first Room persistence.",
      "Localised into 5+ languages.",
      "Health tasks with deadlines, importance levels and customisable reminders.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Health_Tracking_App" }],
  },
  {
    slug: "freshcart",
    title: "FreshCart",
    tagline: "A multi-role Django e-commerce platform.",
    year: "2024",
    category: "systems",
    stack: ["Django", "MySQL", "REST", "ER design"],
    summary:
      "A full-stack e-commerce platform with user, vendor and admin roles, relational design with ER diagrams and REST APIs.",
    highlights: ["Three-role access model across customers, vendors and administrators."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/FreshCart" }],
  },
  {
    slug: "stick-hero",
    title: "Stick Hero",
    tagline: "A JavaFX recreation of the arcade classic.",
    year: "2023",
    category: "systems",
    stack: ["Java", "JavaFX", "Scene Builder", "JUnit"],
    summary:
      "A self-made recreation of Stick Hero in Java and JavaFX, used to practise OOP design patterns and testing.",
    highlights: ["Singleton, Factory and Observer patterns, with JUnit tests."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/Stick-Hero" }],
  },
  {
    slug: "risc-v-assembler",
    title: "RISC-V Assembler & Simulator",
    tagline: "A custom assembler and simulator for a given instruction set.",
    year: "2023",
    category: "systems",
    stack: ["Python", "RISC-V", "Computer Organization"],
    summary:
      "A custom assembler and simulator for a given ISA, built for the Computer Organization course under Dr. Sujey Deb.",
    highlights: ["Mar – May 2023; end-to-end: assembly text in, simulated execution out."],
    links: [{ label: "GitHub", href: "https://github.com/Abhishekjha18/IIITD_CO_project" }],
  },
];

/* ------------------------------------------------------------------ */
/* Honors                                                              */
/* ------------------------------------------------------------------ */

export const honors: {
  when: string;
  title: string;
  detail: string;
  big?: string;
  href?: string;
}[] = [
  {
    when: "Oct 2026",
    big: "AIR 2",
    title: "GE HealthCare Precision Care Challenge 2026 — Grand Finale",
    detail: "Ranked 2nd of 8,000+ teams with ClaimCast (team of four, IIIT Delhi).",
    href: "/projects/claimcast/",
  },
  {
    when: "2026",
    title: "Pre-Placement Offer — Applied Scientist, Amazon",
    detail: "Full-time return offer converted from the Jan–Jun 2026 Applied Science internship.",
  },
  {
    when: "Q1 2026",
    title: "Init-Together Award",
    detail: "Amazon RBS All-Hands, for cross-functional collaboration and raising the bar.",
  },
  {
    when: "Feb 2026",
    title: "Two research posters accepted",
    detail: "Amazon's internal EdgeAI Science Summit.",
  },
  {
    when: "Oct 2025",
    big: "AIR 3",
    title: "Amazon ML Challenge 2025",
    detail: "Third place of 20,000+ teams — hybrid DeBERTa + cross-attention price prediction.",
    href: "/projects/amazon-ml-challenge/",
  },
  {
    when: "2025",
    big: "#1",
    title: "ST AIoT Craft Design Contest — Winner",
    detail: "For License-Metric, an AI-enabled real-time driver evaluation system.",
    href: "/projects/license-metric/",
  },
  {
    when: "2024",
    big: "#1",
    title: "LFR Hackathon — 1st Prize",
    detail: "Invictus, DTU Techfest 2024 — an efficient maze-solving algorithm for a line-follower robot.",
  },
  {
    when: "2024",
    title: "DevHaven Hackathon — Finalist",
    detail: "API-driven software development, team of four.",
  },
  {
    when: "2024",
    title: "Cleared Round 1, NXP AIM Challenge",
    detail: "Selected for the showcase round.",
  },
  {
    when: "2024",
    title: "Teaching recognition, ECE Labs",
    detail: "For teaching IoT and Arduino at the Electronic Design Carnival, IIIT Delhi (team of four).",
  },
  {
    when: "2024",
    title: "10/10 in Electronic System Design",
    detail: "Course taught by Prof. Alok Mittal of the ST Microelectronics SRA team.",
  },
];

/* ------------------------------------------------------------------ */
/* Skills / education / beyond                                         */
/* ------------------------------------------------------------------ */

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C++", "C", "Rust", "Java", "Kotlin", "JavaScript / TypeScript", "C#", "Verilog", "TCL", "Shell", "PowerShell"] },
  {
    group: "ML & foundation models",
    items: ["PyTorch", "TensorFlow / TFLite (custom ops)", "JAX", "Hugging Face Transformers", "LangChain", "OpenCV", "scikit-learn", "ONNX", "LLM evaluation (LLM-as-judge, ROUGE, BERTScore)"],
  },
  {
    group: "RL & agentic systems",
    items: ["PPO", "Monte Carlo Tree Search", "Markov modelling", "OpenEnv", "WebMCP / MCP", "Long-horizon agents", "Deterministic reward & verifier design"],
  },
  {
    group: "Edge AI & quantization",
    items: ["Vector quantization (CRVQ, VQ, PCDVQ, RVQ)", "Post-training quantization", "DeepCABAC", "ST EdgeAI toolkit", "Qualcomm AI Hub", "Lookup-table activations", "Bazel"],
  },
  {
    group: "VLSI & hardware",
    items: ["Cadence Virtuoso, Innovus, Genus, Tempus, Conformal", "Eldo", "Xilinx Vivado", "STM32 CubeMX", "FPGA (Zedboard)", "KiCad · EagleCAD", "STA · P&R · DRC/LVS · Monte Carlo PVT"],
  },
  {
    group: "Systems & web",
    items: ["Linux", "Git", "Docker", "FastAPI · Flask · Django", "React · Node.js", "Postgres · MySQL · DynamoDB", "AWS (Lambda, SAM)", "GCP", "Amazon Neptune / Gremlin", "ROS"],
  },
];

export const education = {
  school: "Indraprastha Institute of Information Technology, Delhi (IIIT Delhi)",
  degree: "B.Tech. in Electronics and VLSI",
  dates: "Nov 2022 – May 2027",
  coursework: [
    "Artificial Intelligence",
    "Data Structures & Algorithms",
    "Algorithm Design & Analysis",
    "Probability & Statistics",
    "Linear Algebra",
    "Operating Systems",
    "Computer Organization",
    "Signals & Systems",
    "Human-Computer Interaction",
    "Usable Security & Privacy",
    "Memory Design & Testing",
    "Embedded Logic Design",
  ],
  earlier: "Kamal Model Senior Secondary School, Delhi — CBSE Class XII (Science), 2021, 92.2%.",
};

export const beyond: { title: string; detail: string }[] = [
  { title: "E-Summit organiser", detail: "Helped run IIIT Delhi's entrepreneurship summit for 1,500+ participants." },
  { title: "Hostel committee member", detail: "Operations for 200+ students." },
  { title: "Teaching IoT & Arduino", detail: "Taught at the Electronic Design Carnival, recognised by ECE Labs." },
];
