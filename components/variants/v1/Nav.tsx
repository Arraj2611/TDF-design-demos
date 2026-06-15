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
  { id: 'events', key: 'events' },
  { id: 'news', key: 'news' },
  { id: 'solapur', key: 'solapur' },
  { id: 'contact', key: 'contact' },
] as const;

export function Nav() {
  const t = useT();
  const [active, setActive] = useState<string>('about');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = ids[0] ?? 'about';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={clsx(styles.nav, scrolled && styles.navScrolled)}>
        <div className={clsx(styles.container, styles.navInner)}>
          <a href="#top" className={styles.logo} aria-label="TDF home" onClick={close}>
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

          {/* Desktop nav links */}
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
            <BilingualToggle className={clsx(styles.navToggle)} />
            {/* Hamburger — visible only on mobile */}
            <button
              className={clsx(styles.navBurger, menuOpen && styles.navBurgerOpen)}
              onClick={() => setMenuOpen((m) => !m)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span className={styles.navBurgerBar} />
              <span className={styles.navBurgerBar} />
              <span className={styles.navBurgerBar} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={clsx(styles.mobileDrawer, menuOpen && styles.mobileDrawerOpen)}
      >
        <nav aria-label="Mobile navigation" className={styles.mobileNavLinks}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={clsx(
                styles.mobileNavLink,
                active === l.id && styles.mobileNavLinkActive
              )}
              onClick={close}
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>
        <a href="#contact" className={styles.mobileNavJoin} onClick={close}>
          {t.nav.join} →
        </a>
        <div className={styles.mobileNavBottom}>
          <BilingualToggle />
        </div>
      </div>

      {/* Tap-outside backdrop */}
      {menuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={close}
          aria-hidden="true"
        />
      )}
    </>
  );
}
