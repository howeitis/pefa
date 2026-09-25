import { Link } from 'react-router';
import type { Route } from './+types/club';
import { clubById, clubLore, crestSrc, formatFollowers } from '~/canon';
import { pageMeta } from '~/meta';
import { NotInvited, notInvitedMeta } from '~/components/shared/NotInvited';
import { CLUB_PATH } from '~/site-map';

// No loader: the canon is static JSON bundled with the page, so the slug is
// resolved in the component. That way an unknown slug renders the 404 on a
// static host instead of failing to fetch loader data that was never built.
function listing(slug: string) {
  const club = clubById(slug);
  const lore = club && clubLore[club.id];
  return club && lore ? { club, lore } : null;
}

export const meta = ({ params }: Route.MetaArgs) => {
  const found = listing(params.slug);
  return found
    ? pageMeta({
        path: CLUB_PATH(found.club.id),
        title: `${found.club.name} (${found.lore.ticker})`,
        description: found.lore.positioning,
      })
    : notInvitedMeta;
};

// Phase 0 listing page: the filing card essentials. Phase 2 builds the full
// listing document (valuation ledger, risk factor, share quote).
export default function ClubListing({ params }: Route.ComponentProps) {
  const found = listing(params.slug);
  if (!found) return <NotInvited />;
  const { club, lore } = found;
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <Link to="/superior-league" className="smallcaps text-ink-muted hover:text-accent">
        ← The Superior League
      </Link>
      <article className="mt-6 border border-rule bg-surface p-6 sm:p-12">
        <div className="flex items-start gap-6">
          <img
            src={crestSrc(club)}
            alt=""
            width={96}
            height={96}
            className="h-20 w-20 sm:h-24 sm:w-24"
          />
          <div>
            <p className="smallcaps text-ink-muted">
              {club.membership === 'permanent' ? 'Founder member' : 'Synergy Draft™ pool'} ·{' '}
              {club.city}, {club.country}
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">{club.name}</h1>
            <p className="mt-3 italic text-ink-muted">{lore.positioning}</p>
          </div>
        </div>
        <dl className="figures mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-6 text-sm sm:grid-cols-4">
          <div>
            <dt className="smallcaps text-ink-muted">Ticker</dt>
            <dd className="mt-1 text-lg">{lore.ticker}</dd>
          </div>
          <div>
            <dt className="smallcaps text-ink-muted">List price</dt>
            <dd className="mt-1 text-lg">£{lore.listPrice}</dd>
          </div>
          <div>
            <dt className="smallcaps text-ink-muted">Valuation</dt>
            <dd className="mt-1 text-lg">£{lore.valuationBn.toFixed(1)}bn</dd>
          </div>
          <div>
            <dt className="smallcaps text-ink-muted">TokTok reach</dt>
            <dd className="mt-1 text-lg">{formatFollowers(lore.tokTokFollowers)}</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
