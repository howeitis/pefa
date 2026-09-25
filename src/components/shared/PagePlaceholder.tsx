import type { SitePage } from '~/site-map';

/**
 * Stand-in for a page that hasn't been built yet. Written in character, so a
 * half-finished deploy still reads as the site rather than as scaffolding.
 */
export function PagePlaceholder({ page }: { page: SitePage }) {
  if (page.material === 'floodlight') {
    return (
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_-10%,rgb(229_184_66/0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="smallcaps text-accent">In preparation</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] sm:text-7xl">
            {page.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-muted">{page.description}</p>
          <p className="mt-12 text-sm text-ink-muted">
            This page is subject to ongoing review. It will be published when it is commercially
            appropriate to do so.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <article className="relative border border-rule bg-surface p-6 shadow-sm sm:p-12">
        <p className="smallcaps text-ink-muted">PEFA™ · Public filing</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{page.title}</h1>
        <p className="mt-6 text-ink-muted">{page.description}</p>
        <hr className="my-8 border-rule" />
        <p className="text-sm">
          This filing is pending. Its contents have been lodged and are awaiting the approval of the
          compliance team.
        </p>
        <p
          aria-hidden="true"
          className="smallcaps absolute right-6 top-6 rotate-6 border-2 border-foil px-3 py-1 text-foil sm:right-12 sm:top-12"
        >
          Pending
        </p>
      </article>
    </div>
  );
}
