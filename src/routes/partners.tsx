import { Link } from 'react-router';
import { clubLore, domestic, formatFollowers, scene } from '~/canon';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/partners');

const partners = scene('partners');

/** Combined TokTok following of all 28 clubs, from their listing figures. */
const combinedReach = Object.values(clubLore).reduce((sum, l) => sum + l.tokTokFollowers, 0);

const PRODUCTS = [
  { name: 'Superior Venue™', body: 'The matchday environment.', to: '/superior-venue' },
  { name: 'Synergy Draft™', body: 'Global access, weighted by tier.', to: '/synergy-draft' },
  { name: 'Micro-Betting™', body: 'In-play markets on every moment.', to: '/superior-venue' },
  { name: 'Superior League app™', body: 'Participation, throughout.', to: '/superior-venue' },
];

/**
 * House content: PEFA advertising its own inventory. Labelled as house
 * content, never presented as a real sponsor (PLAN.md §1, advertising honesty).
 */
const HOUSE_INVENTORY = [
  {
    title: 'Naming rights: the Brand Damage zone',
    body: 'Three places at the foot of the table, watched more closely than the top. Your brand, where it matters most.',
  },
  {
    title: 'Presenting partner: the Second Ball',
    body: 'From the eightieth minute, a second ball enters play under trial conditions. It could carry your name.',
  },
  {
    title: 'Official supplier: supporter tolerance',
    body: 'The Superior League’s most renewable resource, available for association in all territories.',
  },
];

export default function Partners() {
  return (
    <>
      <Hero
        kicker="Partners"
        title="PEFA thanks its partners for their continued ownership of this moment."
      />

      <Section id="technology" kicker="Technology partners" title="The match is supervised.">
        <ul className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-3">
          {partners.partners!.map((p) => (
            <li key={p.name} className="reveal bg-surface p-8">
              <p className="font-display text-4xl">{p.name}</p>
              <p className="mt-4 text-ink-muted">{p.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          Clawed AI is also title partner of {domestic.cupName}.{' '}
          <Link to="/technology" className="font-semibold text-ink hover:text-accent">
            More on technology leadership <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Section>

      <Section
        id="platform"
        kicker="Platform partner"
        title="TokTok"
        intro={
          <p>
            The official short-form platform of the Superior League. Reach is printed on every
            asset, because PEFA’s media kit requires it. Where two clubs finish level on points
            under the Subscription Tiebreak decree, TokTok following separates them.
          </p>
        }
      >
        <p className="reveal figures font-display text-6xl text-accent sm:text-8xl">
          {formatFollowers(combinedReach)}
        </p>
        <p className="smallcaps mt-4">Combined club reach on TokTok, at listing</p>
      </Section>

      <Section id="products" kicker="PEFA™ products" title="Owned and operated.">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <li key={p.name} className="reveal">
              <Link
                to={p.to}
                className="block h-full rounded-sm border border-rule bg-surface p-6 hover:border-accent"
              >
                <p className="font-display text-2xl">{p.name}</p>
                <p className="mt-2 text-sm text-ink-muted">{p.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="inventory"
        kicker="Available inventory"
        title="This space is available. So is most of the sport."
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {HOUSE_INVENTORY.map((slot) => (
            <li
              key={slot.title}
              className="reveal flex flex-col rounded-sm border border-dashed border-accent p-8"
            >
              <p className="smallcaps text-ink-muted">PEFA™ house content</p>
              <h3 className="mt-4 font-display text-2xl">{slot.title}</h3>
              <p className="mt-3 flex-1 text-ink-muted">{slot.body}</p>
              <p className="mt-6 text-sm font-semibold text-accent">Enquiries: by invitation</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
