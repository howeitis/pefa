import type { ReactNode } from 'react';

export interface LedgerColumn<Row> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  /** Hide below the `sm` breakpoint, so the ledger fits a phone without scrolling. */
  wide?: boolean;
  render: (row: Row) => ReactNode;
}

/** A ledger: tabular figures, hairline rules, small-caps headers. */
export function LedgerTable<Row>({
  caption,
  columns,
  rows,
  rowKey,
  footnote,
}: {
  caption: string;
  columns: LedgerColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  footnote?: ReactNode;
}) {
  const cell = (c: LedgerColumn<Row>) =>
    `${c.align === 'right' ? 'text-right' : 'text-left'} ${c.wide ? 'hidden sm:table-cell' : ''}`;
  return (
    <figure>
      <table className="figures w-full border-collapse text-sm">
        <caption className="smallcaps pb-3 text-left text-ink-muted">{caption}</caption>
        <thead>
          <tr className="border-y-2 border-ink">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`smallcaps px-2 py-2 font-semibold first:pl-0 last:pr-0 ${cell(c)}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-rule">
              {columns.map((c) => (
                <td key={c.key} className={`px-2 py-2.5 first:pl-0 last:pr-0 ${cell(c)}`}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && <figcaption className="mt-3 text-xs text-ink-muted">{footnote}</figcaption>}
    </figure>
  );
}
