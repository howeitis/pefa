import { Link } from 'react-router';
import type { Route } from './+types/club';
import { clubById, clubLore, clubs, crestMini, crestThumb, formatFollowers } from '~/canon';
import { FactList } from '~/components/filing/FactList';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { Footnote } from '~/components/filing/Footnote';
import { PriceChart } from '~/components/filing/PriceChart';
import { Stamp } from '~/components/filing/Stamp';
import { ClubWordmark } from '~/components/shared/ClubWordmark';
import { NotInvited, notInvitedMeta } from '~/components/shared/NotInvited';
import { history } from '~/lib/market';
import { pageMeta } from '~/meta';
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
        description: `${found.lore.positioning} ${found.club.name} is a fictional club in Superior League 2036, a free satirical football manager game.`,
      })
    : notInvitedMeta;
};

const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

interface ClubVenue {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const CLUB_VENUES: Record<string, ClubVenue> = {
  armory: {
    src: '/venues/armory.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of The Armory Group Superior Venue beneath its 19°C translucent climate dome, featuring circular Clawed AI live valuation ribbons and crimson seats with individual displays.',
  },
  kensington: {
    src: '/venues/kensington.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Kensington Capital FC’s Superior Venue in West London beneath a sealed glass climate dome reading 19°C, with royal-blue instrumented seating and a circular Clawed AI valuation halo.',
  },
  'boston-reds': {
    src: '/venues/boston-reds.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Boston Reds of Merseyside’s Superior Venue enclosed beneath soaring red structural steel trusses and glass roof panels, with overhead acoustic arrays and circular Clawed AI valuation displays.',
  },
  citizens: {
    src: '/venues/citizens.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Manchester Citizens* Corp’s circular Superior Venue beneath a sealed glass dome framed by towering angled white exterior suspension masts, sky-blue instrumented seats, and circular valuation ribbons.',
  },
  'red-devils': {
    src: '/venues/red-devils.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Red Devils PLC’s Superior Venue enclosed by a translucent climate dome spanning massive red cantilevered steel trusses, with scarlet instrumented seats and a glowing amber Synthetic Away End.',
  },
  'white-hart-loan': {
    src: '/venues/white-hart-loan.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of White Hart Loan FC’s Superior Venue beneath a closed glass dome reading 19°C, featuring the illuminated mid-tier Cheese Room lounge, circular valuation halo, and navy seating.',
  },
  almostico: {
    src: '/venues/almostico.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Almostico de Madrid FC’s Superior Venue beneath a sweeping wavy pleated roof sealed by a translucent 19°C climate dome, with red-and-white seating and circular Clawed AI valuation ribbons.',
  },
  'more-than-a-club': {
    src: '/venues/more-than-a-club.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of More Than A Club™ FC’s colossal three-tier Superior Venue in Barcelona beneath a sealed translucent radial-cable dome reading 19°C, ringed by garnet-and-blue valuation boards.',
  },
  vardrid: {
    src: '/venues/vardrid.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Royal VARdrid’s steep vertical Superior Venue beneath a closed futuristic roof, featuring a colossal 360-degree overhead halo displaying Clawed AI VAR Verdict Confirmed and purple-and-gold seating.',
  },
  'milano-runway': {
    src: '/venues/milano-runway.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Milano Runway FC’s steep three-tier Superior Venue beneath massive red overhead roof girders and a glass climate canopy, featuring a lit glass fashion boutique overlooking the pitch.',
  },
  debito: {
    src: '/venues/debito.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Internazionale Debito FC’s steep three-tier Superior Venue beneath gunmetal roof girders and a sealed 19°C glass canopy, with royal-blue seating and bond-yield valuation ribbons.',
  },
  piemonte: {
    src: '/venues/piemonte.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Piemonte Capital’s intimate black-and-white Superior Venue in Turin beneath a closed glass roof framed by twin white exterior suspension masts and a 19°C circular valuation halo.',
  },
  'saint-sovereign': {
    src: '/venues/saint-sovereign.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Paris Saint-Sovereign’s elliptical Superior Venue lined with fifty warm-lit concrete ribs beneath a closed canopy and 19°C overhead display ring.',
  },
  'bavarian-monopoly': {
    src: '/venues/bavarian-monopoly.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Bavarian Monopoly’s circular three-tier Superior Venue in Munich wrapped in glowing crimson diamond-quilted roof cushions sealed at 19°C, with a suspended Clawed AI valuation ring.',
  },
  'borussia-export': {
    src: '/venues/borussia-export.webp',
    width: 1024,
    height: 571,
    alt: 'Interior of Borussia Export AG’s Superior Venue in Dortmund enclosed under a structural glass roof beneath yellow pylons, with Clawed AI live valuation boards ringing the black-and-yellow stands.',
  },
  'dc-diplomats': {
    src: '/venues/dc-diplomats.webp',
    width: 1024,
    height: 764,
    alt: 'Twilight exterior of DC Diplomats FC’s Superior Venue on the Anacostia waterfront in Washington, featuring a white neoclassical colonnade, translucent domed roof, and the illuminated Capitol dome on the horizon.',
  },
};

/** A club's listing document, as filed with PEFA on admission. */
export default function ClubListing({ params }: Route.ComponentProps) {
  const found = listing(params.slug);
  if (!found) return <NotInvited />;
  const { club, lore } = found;

  const founder = club.membership === 'permanent';
  const venue = CLUB_VENUES[club.id];
  const index = clubs.findIndex((c) => c.id === club.id);
  const prev = clubs[(index - 1 + clubs.length) % clubs.length]!;
  const next = clubs[(index + 1) % clubs.length]!;
  const rivals = club.rivalries.map((id) => clubById(id)).filter((c) => c !== undefined);

  return (
    <FilingPage back={{ to: '/investors', label: 'Investor Relations' }}>
      <FilingDocument
        issuer="PEFA™ · Listing document"
        reference={lore.ticker}
        title={
          <span className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <img
              src={crestThumb(club)}
              alt=""
              width={435}
              height={512}
              data-reveal="scale"
              className="h-24 w-auto shrink-0 self-start drop-shadow-[0_12px_20px_rgb(15_30_54/0.25)] sm:h-28 sm:self-center"
            />
            <span className="min-w-0 flex-1">
              <ClubWordmark
                club={club}
                tone="light"
                decorative
                eager
                className="h-14 w-auto max-w-[min(100%,26rem)] sm:h-20"
              />
              <span className="mt-2.5 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                {club.name}
              </span>
            </span>
          </span>
        }
        subtitle={<p className="font-display italic">{lore.positioning}</p>}
        stamp={
          <Stamp tone={founder ? 'accent' : 'navy'}>
            {founder ? 'Founder · Un-relegatable' : 'Synergy Draft™ pool'}
          </Stamp>
        }
        aside={
          venue && (
            <figure className="overflow-hidden border border-rule bg-surface-2">
              <img
                src={venue.src}
                alt={venue.alt}
                width={venue.width}
                height={venue.height}
                decoding="async"
                className="block h-auto w-full object-cover"
              />
              <figcaption className="smallcaps figures flex items-center justify-between gap-2 border-t border-rule px-3.5 py-2 text-[0.6875rem] text-ink-muted">
                <Link viewTransition to="/superior-venue" className="draw-link hover:text-accent">
                  Superior Venue™
                </Link>
                <span className="text-accent">19°C · Certified</span>
              </figcaption>
            </figure>
          )
        }
      >
        <FactList
          columns={2}
          rows={[
            { label: 'Ticker', value: `${lore.ticker} · ${lore.exchange}` },
            { label: 'Listing price', value: gbp(lore.listPrice) },
            { label: 'Valuation', value: `£${lore.valuationBn.toFixed(1)}bn` },
            {
              label: 'TokTok reach',
              value: (
                <>
                  {formatFollowers(lore.tokTokFollowers)}{' '}
                  <span className="text-ink-muted">
                    ({lore.tokTokFollowers.toLocaleString('en-GB')})
                  </span>
                </>
              ),
            },
            {
              label: 'Membership',
              value: founder ? 'Permanent founder member' : 'Global partner, draft pool',
            },
            { label: 'Domicile', value: `${club.city}, ${club.country}` },
            { label: 'Owner', value: lore.owner },
            {
              label: 'Colours',
              value: (
                <span className="flex items-center gap-2">
                  {[club.colors.primary, club.colors.secondary].map((c) => (
                    <span
                      key={c}
                      aria-hidden="true"
                      className="h-4 w-4 rounded-full border border-rule"
                      style={{ background: c }}
                    />
                  ))}
                  <span className="font-mono text-xs uppercase text-ink-muted">
                    {club.colors.primary} / {club.colors.secondary}
                  </span>
                </span>
              ),
            },
          ]}
        />

        <div className="mt-10">
          <PriceChart
            label={`${lore.ticker} · indicative price`}
            series={(today, days) => history(lore.ticker, lore.listPrice, today, days)}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </div>

        <FilingSection number="1." heading="History, as approved by the compliance team">
          {lore.history.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </FilingSection>

        {rivals.length > 0 && (
          <FilingSection number="2." heading="Designated rivalries">
            <ul className="flex flex-wrap gap-3">
              {rivals.map((r) => (
                <li key={r.id}>
                  <Link
                    viewTransition
                    to={CLUB_PATH(r.id)}
                    className="flex items-center gap-3 border border-rule bg-surface px-3.5 py-2.5 transition-colors hover:border-accent"
                  >
                    <img
                      src={crestMini(r)}
                      alt=""
                      width={20}
                      height={24}
                      loading="lazy"
                      className="h-7 w-auto shrink-0"
                    />
                    <ClubWordmark club={r} tone="light" className="h-7 w-auto max-w-[9rem]" />
                  </Link>
                </li>
              ))}
            </ul>
          </FilingSection>
        )}

        <FilingSection number={rivals.length > 0 ? '3.' : '2.'} heading="Disclosed risk factor">
          <p className="border-l-4 border-accent bg-surface-2 px-5 py-4">{lore.riskFactor}</p>
        </FilingSection>

        <div className="mt-12">
          <Footnote>
            Figures are listing figures as filed on admission, stated after the 2036 broadcast
            settlement. TokTok reach is printed on every asset, as the PEFA™ media kit requires.
            Past performance is irrelevant.
          </Footnote>
        </div>
      </FilingDocument>

      <nav
        aria-label="Other listings"
        className="mt-8 flex items-center justify-between gap-4 text-sm"
      >
        <Link
          viewTransition
          to={CLUB_PATH(prev.id)}
          className="flex min-w-0 items-center gap-2.5 hover:text-accent"
        >
          <span aria-hidden="true" className="shrink-0">
            ←
          </span>
          <ClubWordmark
            club={prev}
            tone="light"
            className="h-6 w-auto max-w-[7.5rem] sm:h-7 sm:max-w-[9.5rem]"
          />
        </Link>
        <Link
          viewTransition
          to={CLUB_PATH(next.id)}
          className="flex min-w-0 items-center justify-end gap-2.5 text-right hover:text-accent"
        >
          <ClubWordmark
            club={next}
            tone="light"
            align="right"
            className="h-6 w-auto max-w-[7.5rem] sm:h-7 sm:max-w-[9.5rem]"
          />
          <span aria-hidden="true" className="shrink-0">
            →
          </span>
        </Link>
      </nav>
    </FilingPage>
  );
}
