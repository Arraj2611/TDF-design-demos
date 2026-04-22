'use client';

import { Marquee } from '@/components/shared/Marquee';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v2.module.css';

export function MarqueeSection() {
  const t = useT();
  return (
    <div className={styles.marqueeSection}>
      <Marquee
        items={[
          'Textile Development Foundation · Solapur',
          t.nav.join,
          'VTTES 2026 · 18 November 2026',
          'P-28, MIDC Akkalkot Road, Solapur',
          '240+ Member Units',
          'Est. 1995',
          'Terry Towels · Chaddars · Yarn',
          'tdf.textile@gmail.com · +91 96991 23418',
        ]}
        speed={44}
      />
    </div>
  );
}
