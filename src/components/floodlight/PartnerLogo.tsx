/**
 * Transparent on-dark lockups for PEFA's three technology partners.
 * Heights are tuned per aspect ratio so all three wordmarks match optically
 * when seated side by side.
 */
interface PartnerLogoSpec {
  src: string;
  width: number;
  height: number;
  /** Optical height classes per size variant. */
  heightClass: { md: string; sm: string };
}

const LOGOS: Record<string, PartnerLogoSpec> = {
  Microsack: {
    src: '/partners/microsack.webp',
    width: 720,
    height: 216,
    heightClass: { md: 'h-12 sm:h-14', sm: 'h-7 sm:h-8' },
  },
  'Clawed AI': {
    src: '/partners/clawed-ai.webp',
    width: 712,
    height: 174,
    heightClass: { md: 'h-10 sm:h-12', sm: 'h-6 sm:h-7' },
  },
  ChatGDP: {
    src: '/partners/chatgdp.webp',
    width: 790,
    height: 236,
    heightClass: { md: 'h-12 sm:h-14', sm: 'h-7 sm:h-8' },
  },
};

export function PartnerLogo({
  name,
  size = 'md',
  className = '',
}: {
  name: string;
  size?: 'md' | 'sm';
  className?: string;
}) {
  const logo = LOGOS[name];
  if (!logo) return <span>{name}</span>;
  const wrapperClass =
    size === 'sm' ? 'inline-flex items-center' : 'flex h-14 items-center sm:h-16';
  return (
    <span className={`${wrapperClass} ${className}`}>
      <img
        src={logo.src}
        alt={name}
        width={logo.width}
        height={logo.height}
        decoding="async"
        className={`w-auto max-w-full object-contain object-left ${logo.heightClass[size]}`}
      />
    </span>
  );
}
