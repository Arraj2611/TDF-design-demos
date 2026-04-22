import clsx from 'clsx';
import styles from '@/styles/variants/v9.module.css';

export interface BinaryStripProps {
  /** Roman numeral for the section (e.g. "I", "II"). */
  roman: string;
  /** 12-bit binary pattern; any truthy value renders a filled dot. */
  pattern: readonly (0 | 1)[];
  /** Optional caption to the right of the strip. */
  label?: string;
}

/**
 * BinaryStrip — section signature.
 * A jacquard-card binary row: Roman numeral + 12 dots (filled=black / hollow=25% opacity).
 * Server component — pure render, no state.
 */
export function BinaryStrip({ roman, pattern, label }: BinaryStripProps) {
  return (
    <div className={styles.binStrip} aria-label={`Section ${roman}`}>
      <span className={styles.binRoman}>{roman}</span>
      <span className={styles.binSep} aria-hidden="true">&middot;</span>
      <span className={styles.binDots} aria-hidden="true">
        {pattern.map((bit, i) => (
          <span
            key={i}
            className={clsx(styles.binDot, !bit && styles.binDotOff)}
          />
        ))}
      </span>
      {label ? <span className={styles.binMeta}>{label}</span> : null}
    </div>
  );
}
