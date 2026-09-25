/**
 * Site-authored canon: facts this site adds to the world that the game does
 * not state. Every entry is also logged in CANON.md.
 *
 * - `site-only`         lives here and nowhere else.
 * - `proposed-for-game` could join the game later, via the game's own
 *                        web-first content drop. The site never edits the game.
 */
export type CanonStatus = 'site-only' | 'proposed-for-game';

export interface SiteCanonEntry {
  id: string;
  title: string;
  status: CanonStatus;
  /** The new facts, one per line, as they'd be stated in CANON.md. */
  facts: string[];
  /** Where on the site the facts appear. */
  surfaces: string[];
}

export const SITE_CANON: SiteCanonEntry[] = [
  {
    id: 'pefa-mark',
    title: 'The PEFA™ mark',
    status: 'proposed-for-game',
    facts: [
      'PEFA’s emblem is a football pitch drawn as a chart: a plain pitch outline with a gold trend line climbing through the centre circle and out of the frame.',
      'The PEFA™ wordmark is set in a high-contrast serif; the Superior League keeps its own knot mark as PEFA’s product.',
    ],
    surfaces: ['Header', 'Favicon', 'OG cards'],
  },
  {
    id: 'website-launch',
    title: 'PEFA™ corporate website',
    status: 'site-only',
    facts: [
      'PEFA™ launched its corporate website on 1 July 2036, ahead of the 2036 season.',
      'Transparency is one of PEFA’s five stated objectives, and one of the two that are not redacted.',
    ],
    surfaces: ['/newsroom/corporate-website-launch'],
  },
  {
    id: 'venue-spec',
    title: 'Superior Venue™ specification',
    status: 'proposed-for-game',
    facts: [
      'Every Superior Venue™ holds the pitch at a constant 19°C under a closed roof.',
      'Ticket prices track demand, form and the opponent’s TokTok following.',
      'In-seat displays are tuned to each occupant; chants are composed live from each crowd’s repertoire and cleared for rights.',
      'Seats pulse on shots, tackles and price movements. Financial wellness content is shown at half-time.',
    ],
    surfaces: ['/superior-venue'],
  },
  {
    id: 'partner-roles',
    title: 'Technology partner details',
    status: 'proposed-for-game',
    facts: [
      'Microsack’s crowd audio calibration raises atmosphere at under-attended fixtures and lowers it where the crowd is off-message. Microsack also supports the Synthetic Away End.',
      'Clawed AI shares its opposition modeling with all clubs equally, at tiered rates.',
      'ChatGDP issues statements within four seconds of the final whistle, and generates supporter reaction in advance of the result.',
    ],
    surfaces: ['/technology'],
  },
  {
    id: 'commercial',
    title: 'Commercial positioning',
    status: 'site-only',
    facts: [
      'TokTok is the official short-form platform of the Superior League.',
      'The Superior League trophy is also available as a subscription tier.',
      'PEFA regards the Clawed AI Cup, where ties can still be lost, as heritage content.',
      'PEFA sells house inventory including naming rights to the Brand Damage zone and a presenting partnership for the Second Ball.',
    ],
    surfaces: ['/superior-league', '/partners'],
  },
  {
    id: 'owner-renames',
    title: 'Club owners without real names',
    status: 'proposed-for-game',
    facts: [
      'Fifteen club owner lines, and one risk factor, are renamed so no real company or fund is named (see src/canon/site/clubOverrides.ts). Examples: Back Bay Transatlantic Sporting Group, Citizens Football Multiverse, Catwalk Capital Partners, Perpetual Runner-Up Holdings, The Sovereign Wealth Fund.',
      'GAME FOLLOW-UP: the game’s clubLore.ts still carries the original names.',
    ],
    surfaces: ['/superior-league/clubs/*'],
  },
  {
    id: 'governance-procedure',
    title: 'Governance procedure',
    status: 'proposed-for-game',
    facts: [
      'The decree register numbers the 32 decrees D-01 to D-32, in the game’s order.',
      'Compliance officers in technical areas ensure instructions to players match the club’s commercial obligations.',
      'Appeals against Algorithmic Offside rulings are reviewed by Clawed AI.',
      'Global Inclusion Committee minutes will be filed with Investor Relations; its reasoning will not.',
      'Pending the trademark review, PEFA uses the word “football” under licence from itself.',
    ],
    surfaces: ['/governance'],
  },
  {
    id: 'corporate-record',
    title: 'Corporate record',
    status: 'site-only',
    facts: [
      'Infamtino has been President since incorporation; PEFA’s seat is Luxembourg.',
      'Document references: MK-2035 (Media Kit), IR-2036, GOV-2036, LDR-2036, LGL-2036.',
      'PEFA’s privacy position: “It has not collected any [data]. This is not a policy. It is a limitation, and it is under review.”',
    ],
    surfaces: ['/investors', '/leadership', '/legal'],
  },
  {
    id: 'president-letter',
    title: 'A letter from the President',
    status: 'proposed-for-game',
    facts: [
      'Infamtino’s letter to partners: football “was never about uncertainty. It was about belonging. And belonging, properly structured, is recurring.”',
      'He declines to say what comes next because three of the objectives are redacted; his word is “as ever, non-binding”.',
    ],
    surfaces: ['/', '/leadership#letter', '/investors/annual-report'],
  },
  {
    id: 'president-bio',
    title: 'Giacomo Infamtino: career',
    status: 'site-only',
    facts: [
      'Career as a series of reorganisations: a regional lottery into a subscription (2012), a hotel group into a hospitality platform (2017), a national orchestra into a licensing catalogue (2022).',
      'Joined the advisory board of the Global Broadcast Rights Consortium in 2033, and calls the nine days between its dissolution and PEFA’s incorporation “a transition”.',
      'He has no favourite club: he has fifteen, and five more each summer.',
    ],
    surfaces: ['/leadership#president'],
  },
  {
    id: 'board',
    title: 'The Board of PEFA',
    status: 'proposed-for-game',
    facts: [
      'Dr Helena Voss-Aldridge, Chief Inevitability Officer. Marcus Thornbury, CFO. Priya Kallend, Chief Engagement Officer. Anders Kvist, General Counsel. Céline Marchetti-Brandt, Chief Supporter Tolerance Officer. Tomasz Wierzba, Director, Superior Venue™. Olusegun Adeyemi-Clarke, Chair, Global Inclusion Committee (biography redacted).',
      'The broadcast partner holds a non-voting, decisive observer seat; the supporter representative seat is vacant.',
      'All Board members are appointed by the President, on the President’s recommendation.',
    ],
    surfaces: ['/leadership#board'],
  },
  {
    id: 'annual-report',
    title: 'Annual Report 2035/36',
    status: 'proposed-for-game',
    facts: [
      'First financial period: 14 May 2035 to 30 June 2036; report published 28 August 2036.',
      'Stated objectives, in order: [redacted: replace supporters with subscribers]; Transparency; [redacted: acquire the word “football”]; Certainty; [redacted: remove relegation from all sport].',
      'Supporter Tolerance Index 112 against a target of 100 (100 = the point at which supporters notice). Revenue guaranteed; variance to plan nil.',
      'The accounts were reviewed by the technology partners, who found them consistent with themselves.',
    ],
    surfaces: ['/investors/annual-report'],
  },
  {
    id: 'press-releases',
    title: 'Newsroom, 2035–36',
    status: 'site-only',
    facts: [
      'Launch address delivered 21 May 2035. Founding fifteen confirmed 30 June 2035. Domestic settlement concluded 1 September 2035. “Football” trademark clarification 12 November 2035.',
      'Clawed AI named Official Referee Partner 20 January 2036. Supporter-trust statement 3 March 2036. First Superior Venues™ certified 15 April 2036. Synergy Draft™ 2036 completed 20 June 2036 (the drawn clubs are not named).',
    ],
    surfaces: ['/newsroom'],
  },
  {
    id: 'committee-minutes',
    title: 'Global Inclusion Committee minutes',
    status: 'site-only',
    facts: [
      'Spring session 2036, held 12 March 2036 in Luxembourg (redacted); the Committee reviewed forty-one applications for the 2036 draft.',
      'The Luxembourg office coffee machine was replaced with a subscription model; the machine was not consulted.',
    ],
    surfaces: ['/governance/committee-minutes'],
  },
  {
    id: 'careers-support',
    title: 'Careers and Supporter Services',
    status: 'site-only',
    facts: [
      'Open roles: Compliance Officer (Technical Area), Chant Designer (AI-assisted), Supporter Tolerance Analyst, Heritage Content Archivist. The featured role is Manager.',
      'Supporter Services answers are generated by ChatGDP. Cancellation is available as a premium feature.',
    ],
    surfaces: ['/careers', '/support'],
  },
];
