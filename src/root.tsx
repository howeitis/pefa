import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import type { Route } from './+types/root';
import { SiteFooter } from './components/shared/SiteFooter';
import { SiteHeader } from './components/shared/SiteHeader';
import { materialFor } from './site-map';
import './styles/app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
  { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
];

/**
 * The shell. `data-material` on <body> switches the whole token set, so a
 * page is wholly Floodlight, wholly Filing, or wholly out of character.
 */
export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const material = materialFor(pathname);

  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={material === 'floodlight' ? '#0B0F19' : '#EDE9E2'} />
        <Meta />
        <Links />
      </head>
      <body data-material={material} className="flex min-h-dvh flex-col">
        <SiteHeader material={material} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter material={material} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="smallcaps text-accent">{notFound ? 'Filing not found' : 'Service notice'}</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">
        {notFound ? 'This page was not invited.' : 'An unscheduled outcome has occurred.'}
      </h1>
      <p className="mt-6 text-ink-muted">
        {notFound
          ? 'The page you requested does not hold a seat. Membership is reviewed annually.'
          : 'Our technology partners have been notified and will issue a statement.'}
      </p>
      {import.meta.env.DEV && error instanceof Error && (
        <pre className="mt-8 overflow-x-auto bg-surface p-4 text-xs">{error.stack}</pre>
      )}
    </div>
  );
}
