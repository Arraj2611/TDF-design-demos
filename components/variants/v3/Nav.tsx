'use client';

import { useT } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';
import styles from '@/styles/variants/v3.module.css';

const LINKS = [
  { id: 'about', key: 'about' },
  { id: 'members', key: 'members' },
  { id: 'committee', key: 'board' },
  { id: 'facilities', key: 'facilities' },
  { id: 'news', key: 'news' },
  { id: 'events', key: 'events' },
  { id: 'solapur', key: 'solapur' },
  { id: 'contact', key: 'contact' },
] as const;

export function Nav() {
  const t = useT();
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <a href="#top" className={styles.mark} aria-label="TDF home">
          TDF
        </a>
        <nav aria-label="Primary">
          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{t.nav[l.key]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.right}>
          <BilingualToggle />
          <a href="#contact" className={styles.cta}>
            {t.nav.join}
          </a>
        </div>
      </div>
    </header>
  );
}
