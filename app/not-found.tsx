import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[80vh] max-w-[1200px] place-content-center px-5 py-32 sm:px-8">
      <p className="eyebrow mb-5 text-bad">Verification failed · 404</p>
      <h1 className="display text-[clamp(3rem,9vw,7rem)]">
        That page didn&rsquo;t <em className="text-accent">verify.</em>
      </h1>
      <p className="prose-lede mt-6">No such route — the model may have hallucinated the link.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-solid">
          Back home
        </Link>
        <Link href="/projects/" className="btn btn-ghost">
          Browse projects
        </Link>
      </div>
    </div>
  );
}
