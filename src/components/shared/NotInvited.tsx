/** The 404, in character. Used by the catch-all route and by unknown slugs. */
export function NotInvited() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="smallcaps text-accent">Filing not found</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">This page was not invited.</h1>
      <p className="mt-6 text-ink-muted">
        The page you requested does not hold a seat. Membership is reviewed annually.
      </p>
    </div>
  );
}

export const notInvitedMeta = [{ title: 'Not invited · PEFA™' }];
