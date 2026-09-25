/**
 * Leadership lore: the President's letter, his biography and the Board.
 * All site canon (CANON.md: `president-letter`, `president-bio`, `board`).
 * Every person here is invented; none is modelled on a real individual
 * except the President, who is the game's own parody.
 */

export const LETTER = {
  title: 'A letter from the President',
  salutation: 'Dear partners,',
  paragraphs: [
    'When we founded PEFA™, people asked me whether football could survive without uncertainty. I understood the question. I did not accept its premise.',
    'Football was never about uncertainty. It was about belonging. And belonging, properly structured, is recurring.',
    'For too long the game asked its most loyal people to carry risks nobody had priced: relegation, qualification, the ninetieth minute. We asked a different question. What if nobody had to lose, except in ways we could forecast?',
    'The answer is the Superior League. Fifteen founders, secure in perpetuity. Five partners from around the world, invited every summer. Venues where the weather is always right. Technology that sees the match more clearly than any of us, and explains it afterwards so that we do not have to.',
    'Some have said that we took the game. I will be as clear now as I was in Dublin: we have not taken the game from anyone. We have asked them to subscribe. Many have. The rest remain welcome to, at the tier that suits them.',
    'I am often asked what comes next. I will not say. Not because I do not know, but because three of our objectives are redacted, and I would not wish to spoil them.',
    'The results will remain unscripted. You have my word on that, and my word is, as ever, non-binding.',
  ],
  signOff: 'With gratitude, and under continuous review,',
  signature: 'Giacomo Infamtino',
  role: 'President',
  /** The line the home page pulls out. */
  excerpt:
    'Football was never about uncertainty. It was about belonging. And belonging, properly structured, is recurring.',
};

/** Infamtino's career, told as a series of reorganisations. */
export const BIO = {
  summary:
    'Giacomo Infamtino has spent his career reorganising things that were working into things that were recurring. He is PEFA’s first and only President.',
  timeline: [
    {
      when: '2009',
      what: 'Graduates, with distinction, in organisational design. His thesis argues that every institution is a subscription waiting to be recognised.',
    },
    {
      when: '2012',
      what: 'Reorganises a regional lottery into a subscription. Ticket sales fall. Revenue rises. He calls it “the first proof”.',
    },
    {
      when: '2017',
      what: 'Reorganises a luxury hotel group into a hospitality experience platform. The hotels remain. The rooms are renamed tiers.',
    },
    {
      when: '2022',
      what: 'Reorganises a national orchestra into a licensing catalogue. The orchestra continues to perform, under licence.',
    },
    {
      when: '2033',
      what: 'Joins the advisory board of the Global Broadcast Rights Consortium.',
    },
    {
      when: '5 May 2035',
      what: 'The Consortium is dissolved.',
    },
    {
      when: '14 May 2035',
      what: 'PEFA™ is incorporated in Luxembourg, with Infamtino as President. He describes the nine days in between as “a transition”.',
    },
    {
      when: '2035',
      what: 'Delivers PEFA’s launch address from a data center in Dublin.',
    },
  ],
  personal: 'He does not have a favourite club. He has fifteen, and five more each summer.',
};

export interface BoardMember {
  name: string;
  title: string;
  bio: string;
  /** Redacted biographies keep the text in the DOM for screen readers. */
  redacted?: boolean;
}

export const BOARD: BoardMember[] = [
  {
    name: 'Dr Helena Voss-Aldridge',
    title: 'Chief Inevitability Officer',
    bio: 'Leads long-range planning. Dr Voss-Aldridge has never been surprised by an outcome, and considers surprise a failure of preparation. Her office forecast the 2035 collapse in detail and chose, for commercial reasons, not to mention it.',
  },
  {
    name: 'Marcus Thornbury',
    title: 'Chief Financial Officer',
    bio: 'Responsible for revenue that is guaranteed irrespective of results. Before PEFA he ran treasury for a sovereign stadium fund. He describes the Superior League’s income as “the most predictable thing in sport, including the kick-off time”.',
  },
  {
    name: 'Priya Kallend',
    title: 'Chief Engagement Officer',
    bio: 'Oversees the Superior League app™ and the TokTok partnership. Under her leadership, every Superior League asset displays its reach. She regards a supporter who is not engaging as a supporter who has not yet been reached.',
  },
  {
    name: 'Anders Kvist',
    title: 'General Counsel',
    bio: 'Leads PEFA’s legal function, including the non-recognition of legacy supporter-trust proceedings and the trademark review of the word “football”. He has not lost a case, having declined to recognise any.',
  },
  {
    name: 'Céline Marchetti-Brandt',
    title: 'Chief Supporter Tolerance Officer',
    bio: 'Owns the Supporter Tolerance Index, PEFA’s measure of how much change supporters will accept before they notice. The Index has exceeded its target in every quarter since incorporation.',
  },
  {
    name: 'Tomasz Wierzba',
    title: 'Director, Superior Venue™',
    bio: 'Runs the venue programme with Microsack. He holds the pitch at nineteen degrees and the atmosphere within tolerance, and has personally approved every chant in the current catalogue.',
  },
  {
    name: 'Olusegun Adeyemi-Clarke',
    title: 'Chair, Global Inclusion Committee',
    bio: 'Chairs the Committee that assesses applications to the Synergy Draft™. In keeping with the Committee’s practice, the reasoning behind his appointment has not been published, and nor has this biography.',
    redacted: true,
  },
];

/** Seats that are not people. Listed for completeness. */
export const BOARD_OBSERVERS = [
  { seat: 'Broadcast partner', note: 'Observer. Non-voting. Decisive.' },
  { seat: 'Supporter representative', note: 'Vacant. Under review.' },
];
