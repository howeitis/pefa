import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('superior-league', 'routes/superior-league.tsx'),
  route('superior-league/clubs/:slug', 'routes/club.tsx'),
  route('synergy-draft', 'routes/synergy-draft.tsx'),
  route('superior-venue', 'routes/superior-venue.tsx'),
  route('technology', 'routes/technology.tsx'),
  route('investors', 'routes/investors.tsx'),
  route('investors/prospectus', 'routes/prospectus.tsx'),
  route('governance', 'routes/governance.tsx'),
  route('leadership', 'routes/leadership.tsx'),
  route('newsroom', 'routes/newsroom.tsx'),
  route('newsroom/:slug', 'routes/newsroom-post.tsx'),
  route('careers', 'routes/careers.tsx'),
  route('partners', 'routes/partners.tsx'),
  route('support', 'routes/support.tsx'),
  route('legal', 'routes/legal.tsx'),
  route('play', 'routes/play.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
