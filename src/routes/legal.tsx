import { Link } from 'react-router';
import { lore } from '~/canon';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { FICTION_NOTICE } from '~/components/shared/OocStrip';
import { metaFor } from '~/meta';
import { PLAY_LINKS } from '~/play-links';

export const meta = () => metaFor('/legal');

const MARKS = [
  'PEFA™',
  'Private Equity Football Accelerate™',
  'The Superior League™',
  'Superior Venue™',
  'Synergy Draft™',
  'Micro-Betting™',
  'Superior League app™',
];

const CREDITS: { what: string; who: string; licence: string }[] = [
  {
    what: 'Playfair Display (typeface)',
    who: 'Claus Eggers Sørensen',
    licence: 'SIL Open Font License 1.1',
  },
  { what: 'DM Sans (typeface)', who: 'Colophon Foundry', licence: 'SIL Open Font License 1.1' },
  {
    what: 'Club crests, Superior League marks and trophy artwork',
    who: 'Superior League 2036',
    licence: 'By the game’s author, who also made this site. All rights reserved',
  },
  {
    what: 'React, React Router, Vite, Tailwind CSS',
    who: 'Their respective authors',
    licence: 'MIT License',
  },
];

/**
 * Two voices on one page: PEFA's legalese (sections 1–3), then the real
 * notice (section 4), set out of character so nobody mistakes which is which.
 */
export default function Legal() {
  return (
    <FilingPage width="max-w-4xl">
      <FilingDocument
        issuer="PEFA™ · Legal"
        reference="LGL-2036"
        title="Legal & Disclaimers"
        subtitle="Please read carefully. Nothing below constitutes an offer, a promise, or an admission."
      >
        <FilingSection number="1." heading="General disclaimer">
          <p>{lore.prospectus.footer}</p>
          <p>
            Supporters are not shareholders. Shareholders are not supporters. Any resemblance
            between the two is coincidental and will be corrected.
          </p>
        </FilingSection>

        <FilingSection number="2." heading="Trademarks">
          <p>The following are trademarks of Private Equity Football Accelerate™:</p>
          <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {MARKS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p>The word “football” is subject to ongoing trademark review.</p>
        </FilingSection>

        <FilingSection number="3." heading="Privacy">
          <p>
            PEFA™ values your data. It has not collected any. This is not a policy. It is a
            limitation, and it is under review.
          </p>
        </FilingSection>

        <section
          aria-labelledby="ooc-heading"
          className="ooc mt-12 rounded-md p-6 leading-relaxed sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wide">Out of character</p>
          <h2 id="ooc-heading" className="mt-2 text-2xl font-bold">
            4. The real notice
          </h2>

          <h3 className="mt-6 font-bold">This site is fiction</h3>
          <p className="mt-2">{FICTION_NOTICE}</p>
          <p className="mt-2">
            It is satire. No real football club, league, federation, governing body, company or
            person is depicted, endorsed or affiliated with it. Every club, owner, partner and
            executive named on this site is invented. The site is a companion to{' '}
            <a href={PLAY_LINKS.web} className="font-semibold underline underline-offset-4">
              Superior League 2036
            </a>
            , a football management game.{' '}
            <Link to="/play" className="font-semibold underline underline-offset-4">
              How to play
            </Link>
            .
          </p>

          <h3 className="mt-6 font-bold">Privacy</h3>
          <p className="mt-2">
            This site sets no cookies, runs no analytics or trackers, and loads nothing from
            third-party servers: fonts are served from this site. The forms on it work out their
            answers in your browser and send nothing anywhere. The host, Vercel, may keep standard
            request logs to run the service.
          </p>

          <h3 className="mt-6 font-bold">Credits and licences</h3>
          <ul className="mt-2 space-y-2">
            {CREDITS.map((c) => (
              <li key={c.what}>
                <span className="font-semibold">{c.what}</span>: {c.who}. {c.licence}.
              </li>
            ))}
          </ul>
        </section>
      </FilingDocument>
    </FilingPage>
  );
}
