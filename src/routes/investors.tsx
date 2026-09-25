import { Link } from 'react-router';
import { clubs, league, lore, scene } from '~/canon';
import { FactList } from '~/components/filing/FactList';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { ShareBoard } from '~/components/filing/ShareBoard';
import { Stamp } from '~/components/filing/Stamp';
import { Redacted } from '~/components/shared/Redacted';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/investors');

const genesis = scene('genesis');

type Filing = { title: string; detail: string } & (
  { to: string; status: 'Available' } | { to?: undefined; status: 'Pending' }
);

const FILINGS: Filing[] = [
  {
    title: `${lore.prospectus.title}: ${lore.prospectus.subtitle}`,
    detail: 'The prospectus. Confidential, and not for distribution.',
    to: '/investors/prospectus',
    status: 'Available',
  },
  {
    title: 'League decree register',
    detail: 'All thirty-two decrees available to the Rules Committee.',
    to: '/governance#decrees',
    status: 'Available',
  },
  {
    title: 'Annual Report 2035/36',
    detail: 'Objectives, KPIs and the Supporter Tolerance Index.',
    to: '/investors/annual-report',
    status: 'Available',
  },
  {
    title: 'Global Inclusion Committee: minutes, spring 2036',
    detail: 'The Committee does not publish its reasoning. It does publish its minutes.',
    to: '/governance/committee-minutes',
    status: 'Available',
  },
  {
    title: 'Global Inclusion Committee: minutes, autumn 2036',
    detail: 'Date to be determined by the draw.',
    status: 'Pending',
  },
];

export default function Investors() {
  return (
    <FilingPage>
      <FilingDocument
        issuer="PEFA™ · Investor Relations"
        reference="IR-2036"
        title="Investor Relations"
        subtitle="Filings, figures and the listed clubs of the Superior League."
      >
        <FactList
          columns={2}
          rows={[
            { label: 'Registered', value: 'Luxembourg' },
            { label: 'Incorporated', value: '14 May 2035' },
            { label: 'President', value: 'Giacomo Infamtino' },
            {
              label: 'Structure',
              value: `${league.permanentIds.length} founders + ${league.rotatingSlots} draft berths`,
            },
            { label: 'Clubs listed', value: String(clubs.length) },
            { label: 'Objectives', value: 'Five stated · three redacted' },
          ]}
        />

        <FilingSection number="1." heading="Filings">
          <ul className="divide-y divide-rule border-y border-rule">
            {FILINGS.map((f) => (
              <li key={f.title} className="flex items-start justify-between gap-6 py-4">
                <div>
                  {f.to ? (
                    <Link to={f.to} className="font-semibold hover:text-accent">
                      {f.title}
                    </Link>
                  ) : (
                    <span className="font-semibold">{f.title}</span>
                  )}
                  <p className="mt-1 text-sm text-ink-muted">{f.detail}</p>
                </div>
                <span
                  className={`smallcaps shrink-0 ${f.status === 'Available' ? 'text-navy' : 'text-accent'}`}
                >
                  {f.status}
                </span>
              </li>
            ))}
          </ul>
        </FilingSection>

        <FilingSection number="2." heading={genesis.filingTitle!}>
          <FactList
            rows={genesis.filing!.map((row) => ({
              label: row.label,
              value: row.redacted ? <Redacted>{row.value}</Redacted> : row.value,
            }))}
          />
          <p className="text-sm text-ink-muted">
            Filed nine days after the dissolution of the Global Broadcast Rights Consortium.
          </p>
        </FilingSection>

        <FilingSection number="3." heading="The board" id="board">
          <p className="text-ink-muted">
            {`All ${clubs.length} clubs in the Superior League universe, with indicative daily quotes: the ${league.permanentIds.length} founder members first, then the ${league.globalIds.length} clubs in the Synergy Draft™ pool.`}
          </p>
          <ShareBoard clubs={clubs} />
        </FilingSection>

        <div className="mt-12 flex justify-end">
          <Stamp tone="navy">Filed · Luxembourg</Stamp>
        </div>
      </FilingDocument>
    </FilingPage>
  );
}
