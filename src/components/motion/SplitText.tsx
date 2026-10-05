import { type CSSProperties, createElement, type ElementType, Fragment } from 'react';

/**
 * A heading whose words rise out of their own masks as it enters the view
 * (styles/motion.css, `.split`). Wrap words in *asterisks* to set them in
 * gold italic. The words are ordinary inline text, so it reads and wraps as
 * one sentence, with or without script.
 */
export function SplitText({
  text,
  as = 'span',
  className = '',
  id,
  delay,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Extra delay before the first word, in ms. */
  delay?: number;
}) {
  let emphasis = false;
  const words = text.split(/\s+/).filter(Boolean);
  const children = words.map((raw, i) => {
    let word = raw;
    if (word.startsWith('*')) {
      emphasis = true;
      word = word.slice(1);
    }
    const em = emphasis;
    // A closing asterisk may sit before trailing punctuation: *optimized*.
    const close = /\*([.,!?;:’”]*)$/;
    if (close.test(word)) {
      word = word.replace(close, '$1');
      emphasis = false;
    }
    return (
      <Fragment key={i}>
        {i > 0 && ' '}
        <span className="w">
          <span
            style={{ '--i': i } as CSSProperties}
            className={em ? 'italic text-accent' : undefined}
          >
            {word}
          </span>
        </span>
      </Fragment>
    );
  });
  return createElement(
    as,
    {
      id,
      className: `split ${className}`,
      style: delay ? ({ '--delay': `${delay}ms` } as CSSProperties) : undefined,
    },
    children,
  );
}

/** Plain text of a SplitText string, for titles and labels. */
export const plain = (text: string) => text.replace(/\*/g, '');
