'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';
import styles from '@/styles/variants/v2.module.css';

// Bundle's link list — the href id "committee" maps to the "board" label
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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const ids = LINKS.map((l) => l.id);
    const spy = () => {
      let cur = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 180) cur = id;
      }
      setActive(cur);
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', spy);
    };
  }, []);

  return (
    <header className={clsx(styles.nav, scrolled && styles.scrolled)}>
      <div className={clsx(styles.container, styles.navInner)}>
        <a href="#top" className={styles.brand} aria-label="TDF home">
          <span className={styles.brandMark}>
            <Image
              src="/assets/tdf-logo-v2.png"
              alt="Textile Development Foundation"
              width={52}
              height={52}
              priority
            />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandL1}>Textile Development Foundation</span>
            <span className={styles.brandL2}>
              Assn. of Textile Manufacturers · Solapur
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
          <a href="#contact" className={styles.navCta}>
            {t.nav.join}
          </a>
        </nav>
        <div className={styles.navRight}>
          <BilingualToggle />
        </div>
      </div>
    </header>
  );
}
