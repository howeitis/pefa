import { useSyncExternalStore } from 'react';
import { Link } from 'react-router';
import { type Club, clubLore, crestThumb, formatFollowers } from '~/canon';
import { formatReleaseDate } from '~/content/newsroom';
import { inWorldDate, quote, todayUtc } from '~/lib/market';
import { CLUB_PATH } from '~/site-map';
import { LedgerTable } from './LedgerTable';

// The date only exists in the browser. The prerendered HTML shows listing
// prices (server snapshot: null); the client swaps in today's indicative
// quotes on hydration, without a mismatch.
const noSubscribe = () => () => {};
const useToday = () =>
  useSyncExternalStore(
    noSubscribe,
    () => todayUtc(),
    () => null,
  );

const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** All 28 clubs with indicative daily quotes. Deterministic; no feed, no requests. */
export function ShareBoard({ clubs }: { clubs: Club[] }) {
  const today = useToday();

  return (
    <LedgerTable<Club>
      caption={
        today
          ? `Indicative quotes · ${formatReleaseDate(inWorldDate(today))}`
          : 'Listed clubs, at listing'
      }
      rows={clubs}
      rowKey={(c) => c.id}
      columns={[
        {
          key: 'club',
          header: 'Club',
          render: (c) => (
            <Link to={CLUB_PATH(c.id)} className="flex items-center gap-2 hover:text-accent">
              <img src={crestThumb(c)} alt="" width={17} height={20} className="h-5 w-auto" />
              <span className="sm:hidden">{c.cardName}</span>
              <span className="hidden sm:inline">{c.name}</span>
            </Link>
          ),
        },
        { key: 'ticker', header: 'Ticker', render: (c) => clubLore[c.id]!.ticker },
        {
          key: 'list',
          header: 'Listing',
          align: 'right',
          wide: true,
          render: (c) => `£${clubLore[c.id]!.listPrice}`,
        },
        {
          key: 'price',
          header: today ? 'Quote' : 'Price',
          align: 'right',
          render: (c) => {
            const lore = clubLore[c.id]!;
            return today
              ? gbp(quote(lore.ticker, lore.listPrice, today).price)
              : `£${lore.listPrice}`;
          },
        },
        {
          key: 'chg',
          header: 'Day',
          align: 'right',
          render: (c) => {
            if (!today) return <span className="text-ink-muted">—</span>;
            const lore = clubLore[c.id]!;
            const { dayChange } = quote(lore.ticker, lore.listPrice, today);
            if (Math.abs(dayChange) < 0.05) return <span className="text-ink-muted">unch.</span>;
            const up = dayChange > 0;
            return (
              <span className={up ? 'text-navy' : 'text-accent'}>
                <span aria-hidden="true">{up ? '▲' : '▼'}</span>
                <span className="sr-only">{up ? 'up' : 'down'}</span>
                {Math.abs(dayChange).toFixed(1)}%
              </span>
            );
          },
        },
        {
          key: 'reach',
          header: 'TokTok',
          align: 'right',
          wide: true,
          render: (c) => formatFollowers(clubLore[c.id]!.tokTokFollowers),
        },
      ]}
      footnote="Quotes are indicative. They drift daily around the listing price and are the same for every visitor on the same day. They are not a market, and they are not advice. Past performance is irrelevant."
    />
  );
}
