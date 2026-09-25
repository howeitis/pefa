/**
 * Applies the site's club-lore overrides (src/canon/site/clubOverrides.ts)
 * when the imported game JSON is loaded, so the game's original owner names
 * never reach the bundle. The file on disk stays byte-identical to the
 * import (the canon test checks its checksum).
 */
import { readFileSync } from 'node:fs';
import type { Plugin } from 'vite';
import { CLUB_LORE_OVERRIDES } from './src/canon/site/clubOverrides.ts';

export function canonOverrides(): Plugin {
  return {
    name: 'pefa-canon-overrides',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0]!.replace(/\\/g, '/');
      if (!file.endsWith('/src/canon/game/clubLore.json')) return null;
      const lore = JSON.parse(readFileSync(file, 'utf8')) as Record<string, object>;
      for (const [club, override] of Object.entries(CLUB_LORE_OVERRIDES)) {
        if (!lore[club]) this.error(`clubOverrides: unknown club "${club}"`);
        Object.assign(lore[club], override);
      }
      return JSON.stringify(lore);
    },
  };
}
