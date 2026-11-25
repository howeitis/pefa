import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { clubById, clubLore, crestMini, decree, lore } from '~/canon';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { VenueFeatureVisual } from '~/components/floodlight/VenueFeatureVisual';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/superior-venue');

const matchday = lore.prospectus.sections.find((s) => s.heading === 'The Matchday Experience')!;

interface CertifiedVenue {
  clubId: string;
  image: string;
  alt: string;
  caption: string;
}

/** First certified Superior Venues™ shown in architectural preview. */
const CERTIFIED_VENUES: CertifiedVenue[] = [
  {
    clubId: 'armory',
    image: '/venues/armory.webp',
    alt: 'Interior of The Armory Group Superior Venue in North London beneath a sealed translucent climate dome reading 19°C, with circular Clawed AI live valuation and Micro-Betting LED ribbons, crimson seats fitted with individual seatback displays, and a glowing amber Synthetic Away End in the upper tier.',
    caption:
      'North London’s former bowl, now sealed beneath a translucent climate dome holding the pitch at a contractually constant 19°C. Seatback displays deliver personalised offers to every supporter, while the amber glow in the upper corner marks the venue’s calibrated Synthetic Away End.',
  },
  {
    clubId: 'borussia-export',
    image: '/venues/borussia-export.webp',
    alt: 'Interior of Borussia Export AG’s Superior Venue in Dortmund enclosed under a structural glass roof beneath towering yellow pylons, ringed by 19°C and Clawed AI live valuation LED boards above steep black-and-yellow stands.',
    caption:
      'The club’s famed home atmosphere, enclosed in structural glass and balanced by overhead Microsack acoustic arrays. Live Clawed AI valuations wrap the fascia at eye level, ensuring every talent pipeline asset knows its current clearing price before half-time.',
  },
  {
    clubId: 'saint-sovereign',
    image: '/venues/saint-sovereign.webp',
    alt: 'Interior of Paris Saint-Sovereign’s elliptical Superior Venue lined with fifty warm-lit curved concrete ribs beneath a closed canopy, featuring a 19°C overhead display ring, navy seating with gold spiral mosaics, and personal seatback screens.',
    caption:
      'Fifty cantilevered concrete ribs lit to specification beneath a closed elliptical canopy. Sovereign-tier haptic seating, continuous Micro-Betting™ ribbons and 19°C climate lock deliver an identical matchday product regardless of Parisian weather or sporting outcome.',
  },
];

/** Decrees that change the matchday itself. */
const MATCHDAY_DECREES = [
  'sponsored-substitutions',
  'micro-betting-window',
  'inventory-time',
  'live-valuation-boards',
  'synthetic-away-end',
  'wellness-breaks',
].map(decree);

const heroClub = clubById('dc-diplomats')!;
const heroClubLore = clubLore[heroClub.id]!;

export default function SuperiorVenue() {
  return (
    <>
      <Hero
        kicker="Superior Venue™ · Infrastructure by Microsack"
        title="The football stadium has been *revolutionized.*"
        backdrop="grid"
        aside={
          <figure
            data-reveal="up"
            style={{ '--delay': '300ms' } as CSSProperties}
            className="spotlight w-full max-w-lg overflow-hidden rounded-sm border border-rule bg-surface lg:w-[28rem]"
          >
            <div className="overflow-hidden border-b border-rule bg-ground">
              <img
                src="/venues/dc-diplomats.webp"
                alt="Twilight exterior of DC Diplomats FC’s Superior Venue on the Anacostia waterfront in Washington, featuring a white neoclassical colonnade, translucent domed roof, LED ribbon reading DC Diplomats FC, DIP.N, Superior Venue and 19°C, and the illuminated Capitol dome on the horizon."
                width={1024}
                height={764}
                decoding="async"
                className="block aspect-[1024/764] w-full object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={crestMini(heroClub)}
                  alt=""
                  width={20}
                  height={20}
                  decoding="async"
                  className="h-5 w-5 shrink-0 object-contain"
                />
                <Link
                  viewTransition
                  to={`/superior-league/clubs/${heroClub.id}`}
                  className="draw-link smallcaps text-ink hover:text-accent"
                >
                  {heroClub.name}
                </Link>
              </div>
              <span className="smallcaps figures text-accent">19°C · {heroClubLore.ticker}</span>
            </figcaption>
          </figure>
        }
        lede={
          <p>
            Every Superior League fixture is played in a Superior Venue™: a climate-controlled,
            fully instrumented matchday environment built around a single principle. You are not
            merely watching football. You are generating value.
          </p>
        }
      />

      <Section
        index="01"
        id="certified"
        kicker="Certified venues · 2036"
        title="See *Superior Venues™.*"
        intro={
          <p>
            The first wave of founder grounds retrofitted and certified by PEFA™ and Microsack for
            the 2036 season. Every roof closed; every seat instrumented; every atmosphere calibrated
            to broadcast tolerances.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFIED_VENUES.map((venue) => {
            const club = clubById(venue.clubId)!;
            const info = clubLore[club.id]!;
            return (
              <figure
                key={club.id}
                className="spotlight reveal group flex flex-col overflow-hidden rounded-sm border border-rule bg-surface"
              >
                <div className="overflow-hidden border-b border-rule bg-ground">
                  <img
                    src={venue.image}
                    alt={venue.alt}
                    width={1024}
                    height={571}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[1024/571] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="smallcaps figures text-ink-muted">
                      {club.city} · {info.ticker}
                    </p>
                    <p className="smallcaps figures text-accent">19°C · Certified</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={crestMini(club)}
                      alt=""
                      width={24}
                      height={24}
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 shrink-0 object-contain"
                    />
                    <h3 className="font-display text-xl leading-tight">
                      <Link
                        viewTransition
                        to={`/superior-league/clubs/${club.id}`}
                        className="draw-link hover:text-accent"
                      >
                        {club.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{venue.caption}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      <Section
        index="02"
        id="features"
        kicker="Specification"
        title="Standard in every *venue.*"
        intro={<p>{matchday.body[0]}</p>}
      >
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matchday.bullets!.map((name, i) => (
            <li
              key={name}
              className="spotlight reveal flex flex-col overflow-hidden rounded-sm border border-rule bg-surface"
            >
              <div className="border-b border-rule bg-[#080c15]">
                <VenueFeatureVisual name={name} />
              </div>
              <div className="flex items-baseline gap-3 px-6 py-5">
                <span className="smallcaps figures shrink-0 text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl leading-snug">{name}</h3>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        index="03"
        id="regulations"
        kicker="Matchday regulations"
        title="Decrees that shape the experience."
        intro={
          <p>
            Some features are switched on by the season’s league decrees. When one is in force, it
            applies in every venue.
          </p>
        }
      >
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {MATCHDAY_DECREES.map((d) => (
            <li key={d.id} className="reveal relative border-l border-rule pl-6">
              <span
                aria-hidden="true"
                data-reveal="line-y"
                className="absolute -left-px top-0 h-full w-0.5 bg-accent"
              />
              <h3 className="font-display text-2xl">{d.name}</h3>
              <p className="mt-2 text-ink-muted">{d.tagline}</p>
            </li>
          ))}
        </ul>
        <Link
          viewTransition
          to="/governance"
          className="group mt-12 inline-block font-semibold hover:text-accent"
        >
          The full decree register{' '}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </Link>
      </Section>

      <Section
        index="04"
        id="app"
        kicker="Superior League app™"
        title="Participation is *encouraged.*"
      >
        <div className="reveal grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="font-display text-3xl leading-snug">{matchday.footnote}</p>
          <div className="space-y-4 text-ink-muted">
            <p>
              Venue infrastructure, boards, seating and crowd audio calibration are provided by
              Microsack. Valuations are provided by Clawed AI.
            </p>
            <Link
              viewTransition
              to="/technology"
              className="group inline-block font-semibold text-ink hover:text-accent"
            >
              Meet the technology partners{' '}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
