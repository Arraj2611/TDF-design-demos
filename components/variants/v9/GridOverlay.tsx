import styles from '@/styles/variants/v9.module.css';

/**
 * GridOverlay — fixed behind-content Swiss 12-column hairlines.
 * 11 vertical rules at 4% opacity, visible only at desktop widths.
 * Server component — pure render, no state.
 */
export function GridOverlay() {
  return (
    <div className={styles.gridOverlay} aria-hidden="true">
      <div className={styles.gridOverlayInner}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={styles.gridOverlayCol} />
        ))}
      </div>
    </div>
  );
}
