'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';
import styles from '@/styles/variants/v1.module.css';

// The bundle's link list — note the href id "committee" maps to the "board" label
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
  const [active, setActive] = useState<string>('about');

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const spy = () => {
      let current = ids[0] ?? 'about';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) current = id;
      }
      setActive(current);
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
    return () => window.removeEventListener('scroll', spy);
  }, []);

  return (
    <header className={styles.nav}>
      <div className={clsx(styles.container, styles.navInner)}>
        <a href="#top" className={styles.logo} aria-label="TDF home">
          <span className={styles.logoMark}>
            <Image
              src="/assets/tdf-logo-v2.png"
              alt="Textile Development Foundation"
              width={52}
              height={52}
              priority
            />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoTextL1}>Textile Development Foundation</span>
            <span className={styles.logoTextL2}>
              The Association of Textile Manufacturers · Solapur
            </span>
          </span>
        </a>
        <nav aria-label="Primary" className={styles.navLinks}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'active' : undefined}
            >
              {t.nav[l.key]}
            </a>
          ))}
          <a href="#contact" className={styles.navJoin}>
            {t.nav.join} →
          </a>
        </nav>
        <div className={styles.navRight}>
          <BilingualToggle />
        </div>
      </div>
    </header>
  );
}
