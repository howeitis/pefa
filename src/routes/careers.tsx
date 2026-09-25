import { Link } from 'react-router';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/careers');

interface Role {
  title: string;
  team: string;
  location: string;
  body: string;
  status: string;
}

/** Open roles. Site canon (`careers`). None takes applications; see `status`. */
const ROLES: Role[] = [
  {
    title: 'Compliance Officer (Technical Area)',
    team: 'Governance',
    location: 'Every Superior Venue™',
    body: 'Stand in the technical area for every fixture and ensure that instructions given to players are consistent with the club’s commercial obligations. You will be closer to the pitch than anyone except the players, and more influential than most of them.',
    status: 'Filled by rotation',
  },
  {
    title: 'Chant Designer (AI-assisted)',
    team: 'Superior Venue™ · with Microsack',
    location: 'Hybrid',
    body: 'Work with our crowd audio partner to compose chants from each crowd’s historical repertoire, cleared for rights. You will be responsible for the words. The feeling is licensed separately.',
    status: 'Filled by ChatGDP',
  },
  {
    title: 'Supporter Tolerance Analyst',
    team: 'Office of the Chief Supporter Tolerance Officer',
    location: 'Luxembourg',
    body: 'Model how much change supporters will accept before they notice. Experience with indices, sentiment and the word “unprecedented” is desirable.',
    status: 'Closed at tolerance',
  },
  {
    title: 'Heritage Content Archivist',
    team: 'Clawed AI Cup',
    location: 'Remote',
    body: 'Curate footage from the knockout competition, where ties can still be lost, for use as heritage content. You must be comfortable watching football that nobody forecast.',
    status: 'Under review',
  },
];

export default function Careers() {
  return (
    <>
      <Hero
        kicker="Careers at PEFA™"
        title="Join the team that removed sporting merit from football."
        lede={
          <p>
            We are always looking for people who share our belief that the best outcome is the one
            you planned. All roles are remunerated irrespective of results.
          </p>
        }
      />

      <Section
        id="manager"
        kicker="Featured role"
        title="Manager"
        intro={
          <p>
            Take charge of a club in the Superior League. Pick the eleven, set the tactics, work the
            transfer market and survive the board. The table is retained for its commercial value;
            your job is to top it anyway. You have been appointed Manager. The fans are not
            shareholders. Please do not confuse the two.
          </p>
        }
      >
        <div className="ooc flex flex-col gap-4 rounded-md p-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong>Out of character:</strong> this one is real. The Manager’s job is Superior
            League 2036, a football management game.
          </p>
          <Link
            to="/play"
            className="shrink-0 rounded-md bg-ooc-ink px-5 py-3 text-center font-semibold text-ooc"
          >
            Take the job
          </Link>
        </div>
      </Section>

      <Section id="roles" kicker="Open roles" title="Other opportunities.">
        <ul className="grid gap-6 md:grid-cols-2">
          {ROLES.map((r) => (
            <li
              key={r.title}
              className="reveal flex flex-col rounded-sm border border-rule bg-surface p-8"
            >
              <p className="smallcaps text-accent">{r.team}</p>
              <h3 className="mt-3 font-display text-2xl">{r.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{r.location}</p>
              <p className="mt-4 flex-1 text-ink-muted">{r.body}</p>
              <p className="smallcaps mt-6 border-t border-rule pt-4 text-ink-muted">{r.status}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-ink-muted">
          PEFA™ is an equal opportunity employer. Every applicant is assessed by the same
          proprietary weighting, which is not published.
        </p>
      </Section>
    </>
  );
}
