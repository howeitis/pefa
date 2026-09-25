import { Link } from 'react-router';
import { clubLore, clubs, formatFollowers, league } from '~/canon';
import { FactList } from '~/components/filing/FactList';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { Footnote } from '~/components/filing/Footnote';
import { LedgerTable } from '~/components/filing/LedgerTable';
import { PullQuote } from '~/components/filing/PullQuote';
import { Stamp } from '~/components/filing/Stamp';
import { Redacted } from '~/components/shared/Redacted';
import { LETTER } from '~/content/leadership';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/investors/annual-report');

/**
 * The five stated objectives. Three are redacted in public filings (locked
 * canon); the redacted text stays in the DOM, so screen readers hear it.
 * The objectives themselves are site canon (`annual-report`).
 */
const OBJECTIVES: { text: string; redacted?: boolean }[] = [
  { text: 'Replace supporters with subscribers, without either group noticing.', redacted: true },
  { text: 'Transparency.' },
  { text: 'Acquire the word “football”.', redacted: true },
  { text: 'Certainty.' },
  { text: 'Remove relegation from all sport, starting with ours.', redacted: true },
];

const combinedReach = Object.values(clubLore).reduce((sum, l) => sum + l.tokTokFollowers, 0);

interface Kpi {
  name: string;
  target: string;
  result: string;
  note: string;
}

const KPIS: Kpi[] = [
  {
    name: 'Revenue certainty',
    target: '100%',
    result: '100%',
    note: 'Guaranteed irrespective of results.',
  },
  {
    name: 'Supporter Tolerance Index',
    target: '100',
    result: '112',
    note: 'Above tolerance in every quarter.',
  },
  {
    name: 'Relegations',
    target: '0',
    result: '0',
    note: 'Structurally achieved.',
  },
  {
    name: 'Results unscripted',
    target: '100%',
    result: '100%',
    note: 'As promised.',
  },
  {
    name: 'Litigation recognised',
    target: '0',
    result: '0',
    note: 'See Governance.',
  },
  {
    name: 'Combined TokTok reach',
    target: 'More',
    result: formatFollowers(combinedReach),
    note: 'Printed on every asset.',
  },
];

const RISKS = [
  {
    title: 'Football',
    body: 'The sport retains a residual capacity to produce outcomes nobody forecast. It is mitigated by the decree register and monitored by the Chief Inevitability Officer.',
  },
  {
    title: 'Supporters',
    body: 'Supporters may continue to regard themselves as stakeholders. PEFA reminds them, at every opportunity, that they are not shareholders.',
  },
  {
    title: 'Weather',
    body: 'Removed. See Superior Venue™.',
  },
  {
    title: 'Objectives',
    body: 'Three of the five remain redacted. Disclosing them is itself classed as a risk.',
  },
];

export default function AnnualReport() {
  return (
    <FilingPage back={{ to: '/investors', label: 'Investor Relations' }} width="max-w-4xl">
      <FilingDocument
        issuer="PEFA™ · Annual Report"
        reference="AR-2035/36"
        title="Annual Report 2035/36"
        subtitle="For the period from incorporation on 14 May 2035 to 30 June 2036."
        stamp={<Stamp tone="navy">Filed · Luxembourg</Stamp>}
      >
        <FactList
          columns={2}
          rows={[
            { label: 'Period', value: '14 May 2035 – 30 June 2036' },
            { label: 'Clubs listed', value: String(clubs.length) },
            { label: 'Founders', value: String(league.permanentIds.length) },
            { label: 'Draft berths', value: String(league.rotatingSlots) },
            { label: 'Revenue', value: 'Guaranteed' },
            { label: 'Variance to plan', value: 'Nil' },
          ]}
        />

        <FilingSection number="1." heading="President’s statement">
          <PullQuote text={LETTER.excerpt} attribution="G. Infamtino, President" />
          <p>
            Our first year delivered what our structure was designed to deliver, which is to say
            everything we expected. PEFA was incorporated, the settlement with the domestic
            associations was concluded, the Superior Venue™ programme was certified, and the first
            Synergy Draft™ was held on schedule.{' '}
            <Link
              to="/leadership#letter"
              className="underline underline-offset-4 hover:text-accent"
            >
              Read the President’s full letter
            </Link>
            .
          </p>
        </FilingSection>

        <FilingSection number="2." heading="Stated objectives">
          <p>PEFA has five stated objectives. Three are redacted in public filings.</p>
          <ol className="space-y-3">
            {OBJECTIVES.map((o, i) => (
              <li key={o.text} className="flex gap-4 border-b border-rule pb-3">
                <span className="figures w-6 shrink-0 font-semibold text-navy">{i + 1}.</span>
                <span className="text-lg">
                  {o.redacted ? <Redacted>{o.text}</Redacted> : o.text}
                </span>
              </li>
            ))}
          </ol>
        </FilingSection>

        <FilingSection number="3." heading="Key performance indicators">
          <LedgerTable<Kpi>
            caption="KPIs for the period"
            rows={KPIS}
            rowKey={(k) => k.name}
            columns={[
              { key: 'name', header: 'Indicator', render: (k) => k.name },
              { key: 'target', header: 'Target', align: 'right', render: (k) => k.target },
              {
                key: 'result',
                header: 'Result',
                align: 'right',
                render: (k) => <strong>{k.result}</strong>,
              },
              { key: 'note', header: 'Commentary', wide: true, render: (k) => k.note },
            ]}
            footnote="The Supporter Tolerance Index measures how much change supporters will accept before they notice. 100 is the point at which they notice."
          />
        </FilingSection>

        <FilingSection number="4." heading="Principal risks">
          <dl className="grid gap-6 sm:grid-cols-2">
            {RISKS.map((r) => (
              <div key={r.title} className="border-l-4 border-accent bg-surface-2 px-5 py-4">
                <dt className="font-semibold">{r.title}</dt>
                <dd className="mt-1 text-ink-muted">{r.body}</dd>
              </div>
            ))}
          </dl>
        </FilingSection>

        <FilingSection number="5." heading="Review of the accounts">
          <p>
            The accounts for the period have been reviewed by our technology partners, who found
            them consistent with themselves. Clawed AI’s opinion is unqualified. ChatGDP has
            prepared this paragraph.
          </p>
        </FilingSection>

        <div className="mt-12">
          <Footnote>
            This report is provided for informational purposes and constitutes neither an offer, a
            promise, nor an admission. Past performance is irrelevant. Future performance is
            contractually guaranteed.
          </Footnote>
        </div>
      </FilingDocument>
    </FilingPage>
  );
}
