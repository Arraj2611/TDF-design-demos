'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { BilingualToggle } from '@/components/shared/BilingualToggle';
import styles from '@/styles/variants/v10.module.css';

// Hoisted: anchor map is configuration, not state.
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const spy = () => {
      let current = ids[0] ?? 'about';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
      }
      setActive(current);
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
    return () => window.removeEventListener('scroll', spy);
  }, []);

  const close = () => setDrawerOpen(false);

  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <a href="#top" className={styles.navLogo} aria-label="TDF home">
          <Image
            src="/assets/tdf-logo-v2.png"
            alt="Textile Development Foundation"
            width={36}
            height={36}
            priority
          />
        </a>

        <nav aria-label="Primary" className={styles.navLinks}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'active' : undefined}
              onClick={close}
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className={styles.navRight}>
          <BilingualToggle />
          <a href="#contact" className={styles.navJoin}>
            {t.nav.join}
          </a>
          <button
            type="button"
            className={styles.navMenuBtn}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={clsx(styles.navDrawer, drawerOpen && styles.open)}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={close}>
            {t.nav[l.key]}
          </a>
        ))}
      </div>
    </header>
  );
}
