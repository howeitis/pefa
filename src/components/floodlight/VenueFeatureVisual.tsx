/**
 * Visual plates for the nine standard Superior Venue™ features.
 * Each SVG renders at a 5:3 aspect ratio in the Floodlight palette using the
 * page's own display and monospace fonts.
 */
import type { ReactElement, ReactNode } from 'react';

const FONT_MONO = 'var(--font-mono)';
const FONT_DISPLAY = 'var(--font-display)';

function Frame({
  id,
  label,
  glowX = '50%',
  glowY = '30%',
  glowColor = '#e5b842',
  children,
}: {
  id: string;
  label: string;
  glowX?: string;
  glowY?: string;
  glowColor?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 400 240"
      role="img"
      aria-label={label}
      className="block aspect-[5/3] w-full bg-[#080c15]"
    >
      <defs>
        <radialGradient id={`glow-${id}`} cx={glowX} cy={glowY} r="65%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#080c15" stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#f6f4ee"
            strokeOpacity="0.045"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="400" height="240" fill="#080c15" />
      <rect width="400" height="240" fill={`url(#grid-${id})`} />
      <rect width="400" height="240" fill={`url(#glow-${id})`} />
      {children}
    </svg>
  );
}

/** 01 · Climate-controlled conditions */
function ClimateVisual() {
  return (
    <Frame
      id="climate"
      label="Cross-section of a closed glass stadium dome blocking rain outside while holding the pitch inside at 19.0 degrees Celsius."
      glowY="58%"
    >
      {/* External weather blocked outside dome */}
      <g stroke="#6e7484" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round">
        <line x1="42" y1="26" x2="32" y2="48" />
        <line x1="66" y1="18" x2="56" y2="40" />
        <line x1="90" y1="30" x2="80" y2="52" />
        <line x1="316" y1="24" x2="306" y2="46" />
        <line x1="342" y1="16" x2="332" y2="38" />
        <line x1="364" y1="32" x2="354" y2="54" />
      </g>
      <text x="24" y="74" fill="#6e7484" fontFamily={FONT_MONO} fontSize="8.5" letterSpacing="1.2">
        EXT 4°C · RAIN
      </text>
      <text
        x="376"
        y="74"
        textAnchor="end"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        letterSpacing="1.2"
      >
        WEATHER: OFF
      </text>

      {/* Geodesic closed dome */}
      <path
        d="M 38 192 C 56 64, 344 64, 362 192 Z"
        fill="#121826"
        fillOpacity="0.78"
        stroke="#e5b842"
        strokeWidth="2"
      />
      <path
        d="M 88 192 C 102 92, 298 92, 312 192"
        fill="none"
        stroke="#e5b842"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <path
        d="M 142 192 C 150 112, 250 112, 258 192"
        fill="none"
        stroke="#e5b842"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <line x1="60" y1="138" x2="340" y2="138" stroke="#f6f4ee" strokeOpacity="0.08" />

      {/* Emerald pitch base */}
      <rect x="64" y="186" width="272" height="10" rx="2" fill="#15803d" />
      <line x1="64" y1="191" x2="336" y2="191" stroke="#4ade80" strokeOpacity="0.7" />
      <line x1="200" y1="186" x2="200" y2="196" stroke="#f6f4ee" strokeOpacity="0.6" />

      {/* Central temperature readout */}
      <text
        x="200"
        y="138"
        textAnchor="middle"
        fill="#f6f4ee"
        fontFamily={FONT_DISPLAY}
        fontSize="40"
        fontWeight="800"
        letterSpacing="-1"
      >
        19.0°C
      </text>
      <rect
        x="138"
        y="150"
        width="124"
        height="20"
        rx="2"
        fill="#0b0f19"
        stroke="#e5b842"
        strokeOpacity="0.65"
      />
      <text
        x="200"
        y="163.5"
        textAnchor="middle"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.4"
      >
        CLIMATE LOCKED
      </text>

      {/* Flatline graph at bottom */}
      <line x1="38" y1="216" x2="362" y2="216" stroke="#f6f4ee" strokeOpacity="0.14" />
      <line x1="38" y1="216" x2="362" y2="216" stroke="#e5b842" strokeWidth="1.5" />
      <circle cx="362" cy="216" r="3" fill="#e5b842" />
    </Frame>
  );
}

/** 02 · Dynamic ticket pricing */
function DynamicPricingVisual() {
  const rows = [
    { y: 122, count: 10, hot: [5, 6, 7] },
    { y: 142, count: 10, hot: [4, 5, 6, 7] },
    { y: 162, count: 10, hot: [3, 4, 5, 6] },
    { y: 182, count: 10, hot: [4, 5] },
  ];
  return (
    <Frame
      id="pricing"
      label="Live stadium seat pricing map showing seat 14B surging from 185 pounds to 412 pounds on rising demand."
      glowX="70%"
      glowY="38%"
    >
      {/* Seat heat map on the left */}
      <text x="24" y="34" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8.5" letterSpacing="1.2">
        SECTOR 114 · LIVE DEMAND
      </text>
      <g>
        {rows.map((row, rIdx) =>
          Array.from({ length: row.count }, (_, cIdx) => {
            const x = 24 + cIdx * 17;
            const isSelected = rIdx === 1 && cIdx === 5;
            const isHot = row.hot.includes(cIdx);
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={x}
                y={row.y}
                width="12"
                height="12"
                rx="2"
                fill={isSelected ? '#e5b842' : isHot ? '#b45309' : '#1a2234'}
                stroke={isSelected ? '#f6f4ee' : '#f6f4ee'}
                strokeOpacity={isSelected ? 0.9 : 0.14}
                strokeWidth={isSelected ? 1.5 : 1}
              />
            );
          }),
        )}
      </g>
      {/* Curved pitch edge indicator */}
      <path
        d="M 24 210 Q 106 198 190 210"
        fill="none"
        stroke="#22c55e"
        strokeOpacity="0.65"
        strokeWidth="2"
      />
      <text x="24" y="108" fill="#6e7484" fontFamily={FONT_MONO} fontSize="8" letterSpacing="1">
        SEAT 14B · SELECTED
      </text>

      {/* Surge price panel on the right */}
      <rect
        x="212"
        y="46"
        width="164"
        height="156"
        rx="4"
        fill="#121826"
        stroke="#e5b842"
        strokeOpacity="0.45"
      />
      <text
        x="228"
        y="68"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.2"
      >
        SURGE ACTIVE
      </text>
      <text
        x="228"
        y="94"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="12"
        textDecoration="line-through"
      >
        £185
      </text>
      <text x="270" y="96" fill="#f6f4ee" fontFamily={FONT_DISPLAY} fontSize="28" fontWeight="800">
        £412
      </text>
      <text x="228" y="114" fill="#4ade80" fontFamily={FONT_MONO} fontSize="9" fontWeight="700">
        ▲ +122.7% · 14 MIN
      </text>

      {/* Rising sparkline */}
      <polyline
        points="228,164 252,158 272,160 294,142 316,146 338,128 360,118"
        fill="none"
        stroke="#e5b842"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="360" cy="118" r="3.5" fill="#e5b842" />

      <line x1="228" y1="178" x2="360" y2="178" stroke="#f6f4ee" strokeOpacity="0.12" />
      <text x="228" y="193" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.8">
        OPP. TOKTOK: 94.1M
      </text>
    </Frame>
  );
}

/** 03 · Personalized in-seat advertising */
function InSeatAdsVisual() {
  return (
    <Frame
      id="inseat"
      label="Instrumented stadium seatback screen greeting occupant David by name with a targeted mortgage refinancing offer."
      glowY="45%"
    >
      {/* Stadium seatback silhouette */}
      <path
        d="M 74 240 L 86 38 C 88 22, 102 18, 120 18 L 280 18 C 298 18, 312 22, 314 38 L 326 240 Z"
        fill="#121826"
        stroke="#f6f4ee"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      {/* Gold trim stitching */}
      <path
        d="M 88 240 L 98 44 C 100 32, 110 28, 124 28 L 276 28 C 290 28, 300 32, 302 44 L 312 240"
        fill="none"
        stroke="#e5b842"
        strokeOpacity="0.28"
        strokeWidth="1"
      />

      {/* Inset glowing LCD display */}
      <rect
        x="108"
        y="48"
        width="184"
        height="136"
        rx="6"
        fill="#0b0f19"
        stroke="#e5b842"
        strokeWidth="1.5"
      />

      {/* Top status bar inside seat screen */}
      <circle cx="122" cy="64" r="3" fill="#4ade80" />
      <text x="130" y="67" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="7.5" letterSpacing="1">
        SEAT 14B · MATCH 99.4%
      </text>
      <line x1="118" y1="76" x2="282" y2="76" stroke="#f6f4ee" strokeOpacity="0.1" />

      {/* Targeted ad copy */}
      <text
        x="122"
        y="96"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.2"
      >
        WELCOME BACK, DAVID
      </text>
      <text x="122" y="118" fill="#f6f4ee" fontFamily={FONT_DISPLAY} fontSize="16" fontWeight="800">
        Refinance at 6.8% APR
      </text>
      <text x="122" y="135" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8">
        PRE-APPROVED BEFORE KICKOFF
      </text>

      {/* Gold CTA button */}
      <rect x="122" y="148" width="156" height="24" rx="3" fill="#e5b842" />
      <text
        x="200"
        y="163"
        textAnchor="middle"
        fill="#0b0f19"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.1"
      >
        TAP ARMREST TO APPLY
      </text>

      {/* Seat number below display */}
      <text
        x="200"
        y="214"
        textAnchor="middle"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        letterSpacing="1.6"
      >
        EYE-TRACKING · ACTIVE
      </text>
    </Frame>
  );
}

/** 04 · Sponsored substitutions */
function SponsoredSubVisual() {
  return (
    <Frame
      id="sub"
      label="Digital fourth official substitution board dominated by a golden Meridian Wealth sponsor banner above small player numbers."
      glowY="52%"
    >
      {/* Handle frame of LED sub board */}
      <rect
        x="38"
        y="30"
        width="324"
        height="168"
        rx="8"
        fill="#121826"
        stroke="#f6f4ee"
        strokeOpacity="0.22"
        strokeWidth="2"
      />
      <rect x="50" y="42" width="300" height="144" rx="4" fill="#070a12" />

      {/* Tiny player numbers at the top */}
      <text x="70" y="64" fill="#ef4444" fontFamily={FONT_MONO} fontSize="13" fontWeight="700">
        ▼ 07
      </text>
      <text x="122" y="64" fill="#4ade80" fontFamily={FONT_MONO} fontSize="13" fontWeight="700">
        ▲ 19
      </text>
      <text
        x="334"
        y="63"
        textAnchor="end"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8"
        letterSpacing="1"
      >
        68&apos; SUBSTITUTION
      </text>

      {/* Oversized sponsor takeover panel */}
      <rect x="60" y="76" width="280" height="82" rx="3" fill="#e5b842" />
      <text
        x="200"
        y="96"
        textAnchor="middle"
        fill="#0b0f19"
        fontFamily={FONT_MONO}
        fontSize="8"
        fontWeight="700"
        letterSpacing="1.6"
      >
        OFFICIAL BENCH PARTNER
      </text>
      <text
        x="200"
        y="126"
        textAnchor="middle"
        fill="#0b0f19"
        fontFamily={FONT_DISPLAY}
        fontSize="24"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        MERIDIAN WEALTH™
      </text>
      <text
        x="200"
        y="146"
        textAnchor="middle"
        fill="#0b0f19"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1"
      >
        CATEGORY EXCLUSIVE · 11s READOUT
      </text>

      {/* Live readout timer bar */}
      <rect x="60" y="168" width="280" height="6" rx="2" fill="#1a2234" />
      <rect x="60" y="168" width="214" height="6" rx="2" fill="#e5b842" />

      {/* Handle grip */}
      <rect
        x="164"
        y="198"
        width="72"
        height="16"
        rx="3"
        fill="#1a2234"
        stroke="#f6f4ee"
        strokeOpacity="0.16"
      />
      <text
        x="200"
        y="228"
        textAnchor="middle"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8"
        letterSpacing="1.3"
      >
        SYNTHESISED VOICE · ON AIR
      </text>
    </Frame>
  );
}

/** 05 · AI-generated chants */
function AiChantsVisual() {
  const heights = [14, 26, 42, 22, 54, 68, 38, 72, 48, 64, 30, 56, 70, 44, 28, 50, 34, 20, 14];
  return (
    <Frame
      id="chants"
      label="Microsack crowd audio calibration console displaying a rights-cleared AI chant teleprompter and equalizer bars."
      glowY="54%"
    >
      {/* Teleprompter box */}
      <rect
        x="28"
        y="24"
        width="344"
        height="58"
        rx="4"
        fill="#121826"
        stroke="#f6f4ee"
        strokeOpacity="0.14"
      />
      <text
        x="42"
        y="43"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8"
        fontWeight="700"
        letterSpacing="1.2"
      >
        MICROSACK AUDIO · RIGHTS-CLEARED
      </text>
      <text x="42" y="66" fill="#f6f4ee" fontFamily={FONT_DISPLAY} fontSize="15.5" fontWeight="800">
        “Oh we are the [LICENSED] shareholders!”
      </text>

      {/* Equalizer waveform */}
      <g>
        {heights.map((h, idx) => {
          const x = 34 + idx * 18;
          const y = 136 - h / 2;
          const accent = idx >= 5 && idx <= 13;
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width="10"
              height={h}
              rx="2"
              fill={accent ? '#e5b842' : '#2a354d'}
              fillOpacity={accent ? 0.92 : 0.85}
            />
          );
        })}
      </g>

      {/* Bottom calibration gauges */}
      <line x1="28" y1="188" x2="372" y2="188" stroke="#f6f4ee" strokeOpacity="0.12" />
      <text x="28" y="208" fill="#4ade80" fontFamily={FONT_MONO} fontSize="8.5" fontWeight="700">
        BOOST: +14 dB
      </text>
      <text
        x="200"
        y="208"
        textAnchor="middle"
        fill="#b9bcc4"
        fontFamily={FONT_MONO}
        fontSize="8.5"
      >
        94.2 dB TARGET
      </text>
      <text
        x="372"
        y="208"
        textAnchor="end"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
      >
        DAMPING: ON
      </text>
    </Frame>
  );
}

/** 06 · Haptic seating */
function HapticSeatingVisual() {
  return (
    <Frame
      id="haptic"
      label="Side profile of a stadium seat radiating golden haptic vibration waves triggered by shots, tackles, and ticket price movements."
      glowX="34%"
      glowY="52%"
    >
      {/* Concentric vibration rings */}
      <circle
        cx="128"
        cy="128"
        r="28"
        fill="none"
        stroke="#e5b842"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <circle
        cx="128"
        cy="128"
        r="50"
        fill="none"
        stroke="#e5b842"
        strokeOpacity="0.42"
        strokeWidth="1.3"
        strokeDasharray="4 4"
      />
      <circle
        cx="128"
        cy="128"
        r="74"
        fill="none"
        stroke="#e5b842"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />

      {/* Side-profile futuristic bucket seat */}
      <path
        d="M 88 54 L 106 54 L 118 142 L 182 142 C 190 142, 194 148, 194 156 L 194 166 L 106 166 C 96 166, 90 160, 89 148 Z"
        fill="#1a2234"
        stroke="#f6f4ee"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Pedestal base */}
      <rect
        x="132"
        y="166"
        width="16"
        height="32"
        fill="#121826"
        stroke="#f6f4ee"
        strokeOpacity="0.4"
      />
      <rect x="114" y="196" width="52" height="6" rx="2" fill="#e5b842" />
      {/* Active actuator nodes */}
      <circle cx="104" cy="108" r="4" fill="#e5b842" />
      <circle cx="146" cy="154" r="4" fill="#e5b842" />

      {/* Trigger badges on right */}
      {[
        { y: 54, label: 'SHOT ON GOAL', hz: '40 Hz', accent: false },
        { y: 98, label: 'HEAVY TACKLE', hz: '65 Hz', accent: false },
        { y: 142, label: 'PRICE +8.4%', hz: '90 Hz', accent: true },
      ].map((t) => (
        <g key={t.label}>
          <rect
            x="224"
            y={t.y}
            width="150"
            height="34"
            rx="3"
            fill={t.accent ? '#1f1a0d' : '#121826'}
            stroke={t.accent ? '#e5b842' : '#f6f4ee'}
            strokeOpacity={t.accent ? 0.85 : 0.16}
          />
          <text
            x="236"
            y={t.y + 15}
            fill={t.accent ? '#e5b842' : '#f6f4ee'}
            fontFamily={FONT_MONO}
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="0.8"
          >
            {t.label}
          </text>
          <text x="236" y={t.y + 27} fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8">
            PULSE · {t.hz}
          </text>
        </g>
      ))}

      <text
        x="374"
        y="214"
        textAnchor="end"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8"
        letterSpacing="1.2"
      >
        SOLD SEPARATELY
      </text>
    </Frame>
  );
}

/** 07 · Real-time Micro-Betting™ */
function MicroBettingVisual() {
  return (
    <Frame
      id="betting"
      label="In-play Micro-Betting interface showing a 4-second countdown and live odds on the next throw-in."
      glowY="40%"
    >
      {/* Header bar */}
      <rect
        x="24"
        y="24"
        width="352"
        height="192"
        rx="5"
        fill="#121826"
        stroke="#f6f4ee"
        strokeOpacity="0.16"
      />
      <circle cx="42" cy="44" r="3.5" fill="#e5b842" />
      <text
        x="52"
        y="47"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.2"
      >
        MICRO-BETTING™ · IN-PLAY
      </text>
      <rect
        x="292"
        y="34"
        width="70"
        height="20"
        rx="2"
        fill="#2a1215"
        stroke="#ef4444"
        strokeOpacity="0.7"
      />
      <text
        x="327"
        y="47"
        textAnchor="middle"
        fill="#f87171"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
      >
        00:04
      </text>

      <line x1="24" y1="62" x2="376" y2="62" stroke="#f6f4ee" strokeOpacity="0.1" />

      {/* Market prompt */}
      <text x="40" y="88" fill="#f6f4ee" fontFamily={FONT_DISPLAY} fontSize="19" fontWeight="800">
        Next throw-in outcome
      </text>
      <text x="40" y="105" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8">
        73:12 · TOUCHLINE MARKET #409
      </text>

      {/* Three odds buttons */}
      {[
        { x: 40, label: 'SHORT PASS', odds: '1.42', active: false },
        { x: 149, label: 'LONG THROW', odds: '2.85', active: true },
        { x: 258, label: 'FOUL THROW', odds: '9.50', active: false },
      ].map((o) => (
        <g key={o.label}>
          <rect
            x={o.x}
            y="122"
            width="101"
            height="58"
            rx="3"
            fill={o.active ? '#e5b842' : '#0b0f19'}
            stroke={o.active ? '#e5b842' : '#f6f4ee'}
            strokeOpacity={o.active ? 1 : 0.2}
          />
          <text
            x={o.x + 50.5}
            y="142"
            textAnchor="middle"
            fill={o.active ? '#0b0f19' : '#b9bcc4'}
            fontFamily={FONT_MONO}
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="0.8"
          >
            {o.label}
          </text>
          <text
            x={o.x + 50.5}
            y="168"
            textAnchor="middle"
            fill={o.active ? '#0b0f19' : '#f6f4ee'}
            fontFamily={FONT_DISPLAY}
            fontSize="21"
            fontWeight="800"
          >
            {o.odds}
          </text>
        </g>
      ))}

      <text
        x="200"
        y="202"
        textAnchor="middle"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8"
        letterSpacing="1.2"
      >
        SETTLED BEFORE BALL RETURNS TO PLAY
      </text>
    </Frame>
  );
}

/** 08 · Live player valuation updates */
function LiveValuationVisual() {
  const players = [
    {
      x: 24,
      num: '#09',
      price: '€114.8M',
      delta: '▲ +3.4%',
      up: true,
      line: '36,154 62,148 88,140 116,128',
    },
    {
      x: 146,
      num: '#04',
      price: '€62.1M',
      delta: '▼ −4.8%',
      up: false,
      line: '158,132 184,136 210,148 238,158',
    },
    {
      x: 268,
      num: '#11',
      price: '€89.5M',
      delta: '▲ +1.9%',
      up: true,
      line: '280,152 306,144 332,146 360,134',
    },
  ];
  return (
    <Frame
      id="valuation"
      label="Pitchside Clawed AI LED valuation board displaying live player prices ticking up and down during the match."
      glowY="50%"
    >
      {/* Top ticker label */}
      <text
        x="24"
        y="36"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.2"
      >
        CLAWED AI · LIVE VALUATION BOARD
      </text>
      <text
        x="376"
        y="36"
        textAnchor="end"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8"
        letterSpacing="1"
      >
        120 Hz
      </text>

      {/* Three live player cards */}
      {players.map((p) => (
        <g key={p.num}>
          <rect
            x={p.x}
            y="50"
            width="108"
            height="126"
            rx="4"
            fill="#121826"
            stroke={p.up ? '#22c55e' : '#ef4444'}
            strokeOpacity="0.45"
          />
          <text
            x={p.x + 12}
            y="72"
            fill="#b9bcc4"
            fontFamily={FONT_MONO}
            fontSize="9"
            fontWeight="700"
          >
            PLAYER {p.num}
          </text>
          <text
            x={p.x + 12}
            y="98"
            fill="#f6f4ee"
            fontFamily={FONT_DISPLAY}
            fontSize="19"
            fontWeight="800"
          >
            {p.price}
          </text>
          <text
            x={p.x + 12}
            y="115"
            fill={p.up ? '#4ade80' : '#f87171'}
            fontFamily={FONT_MONO}
            fontSize="9"
            fontWeight="700"
          >
            {p.delta}
          </text>
          <polyline
            points={p.line}
            fill="none"
            stroke={p.up ? '#4ade80' : '#f87171'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Pitchside turf bar below LED board */}
      <rect x="24" y="194" width="352" height="16" rx="2" fill="#15803d" fillOpacity="0.85" />
      <line
        x1="24"
        y1="202"
        x2="376"
        y2="202"
        stroke="#f6f4ee"
        strokeOpacity="0.65"
        strokeWidth="1.5"
      />
    </Frame>
  );
}

/** 09 · Complimentary financial wellness content */
function FinancialWellnessVisual() {
  return (
    <Frame
      id="wellness"
      label="Half-time stadium jumbotron displaying a complimentary financial wellness slide titled Managing Matchday Debt."
      glowY="42%"
    >
      {/* Suspension cables */}
      <line x1="116" y1="0" x2="116" y2="30" stroke="#6e7484" strokeWidth="2" />
      <line x1="284" y1="0" x2="284" y2="30" stroke="#6e7484" strokeWidth="2" />

      {/* Jumbotron housing */}
      <rect
        x="36"
        y="30"
        width="328"
        height="160"
        rx="6"
        fill="#121826"
        stroke="#e5b842"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <rect x="46" y="40" width="308" height="140" rx="3" fill="#0b0f19" />

      {/* Slide header */}
      <text
        x="60"
        y="60"
        fill="#e5b842"
        fontFamily={FONT_MONO}
        fontSize="8"
        fontWeight="700"
        letterSpacing="1.3"
      >
        HALF-TIME · 15:00
      </text>
      <text
        x="340"
        y="60"
        textAnchor="end"
        fill="#6e7484"
        fontFamily={FONT_MONO}
        fontSize="8"
        letterSpacing="1"
      >
        COMPLIMENTARY
      </text>
      <line x1="60" y1="68" x2="340" y2="68" stroke="#f6f4ee" strokeOpacity="0.1" />

      {/* Slide content: debt bars + serene title */}
      <text x="60" y="94" fill="#f6f4ee" fontFamily={FONT_DISPLAY} fontSize="17" fontWeight="800">
        Managing Matchday Debt
      </text>
      <text x="60" y="112" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8">
        CHAPTER 4 · AFTER DYNAMIC PRICING
      </text>

      {/* Bar chart */}
      <rect x="60" y="138" width="44" height="24" rx="2" fill="#1a2234" />
      <rect x="112" y="128" width="44" height="34" rx="2" fill="#2a354d" />
      <rect x="164" y="120" width="44" height="42" rx="2" fill="#b45309" />
      <rect x="216" y="114" width="44" height="48" rx="2" fill="#e5b842" />
      <text x="272" y="142" fill="#e5b842" fontFamily={FONT_MONO} fontSize="8" fontWeight="700">
        BREATHE IN
      </text>
      <text x="272" y="156" fill="#b9bcc4" fontFamily={FONT_MONO} fontSize="8">
        SUBSCRIBE ON
      </text>

      {/* Dim stadium pitch line below */}
      <path
        d="M 48 220 Q 200 204 352 220"
        fill="none"
        stroke="#15803d"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
    </Frame>
  );
}

const VISUALS: Record<string, () => ReactElement> = {
  'Climate-controlled conditions': ClimateVisual,
  'Dynamic ticket pricing': DynamicPricingVisual,
  'Personalized in-seat advertising': InSeatAdsVisual,
  'Sponsored substitutions': SponsoredSubVisual,
  'AI-generated chants': AiChantsVisual,
  'Haptic seating': HapticSeatingVisual,
  'Real-time Micro-Betting™': MicroBettingVisual,
  'Live player valuation updates': LiveValuationVisual,
  'Complimentary financial wellness content': FinancialWellnessVisual,
};

export function VenueFeatureVisual({ name }: { name: string }) {
  const Component = VISUALS[name];
  return Component ? <Component /> : null;
}
