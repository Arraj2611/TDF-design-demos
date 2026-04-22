'use client';

import Image from 'next/image';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v3.module.css';

export function Footer() {
  const t = useT();
  const f = t.foot;
  return (
    <footer className={styles.foot}>
      <div className={styles.footTop}>
        <div>
          <div className={styles.footMark}>
            <Image src="/assets/tdf-logo-v2.png" alt="TDF" width={48} height={48} />
          </div>
          <p className={styles.footTag}>{f.tag}</p>
        </div>
        <div>
          <div className={styles.footHead}>{f.explore}</div>
          <ul className={styles.footList}>
            <li>
              <a href="#about">{t.nav.about}</a>
            </li>
            <li>
              <a href="#members">{t.nav.members}</a>
            </li>
            <li>
              <a href="#committee">{t.nav.board}</a>
            </li>
            <li>
              <a href="#facilities">{t.nav.facilities}</a>
            </li>
            <li>
              <a href="#events">{t.nav.events}</a>
            </li>
            <li>
              <a href="#contact">{t.nav.contact}</a>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.footHead}>{f.resources}</div>
          <ul className={styles.footList}>
            {f.resourceItems.map((r, i) => (
              <li key={i}>
                <a href="#">{r}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.footHead}>{f.connect}</div>
          <ul className={styles.footList}>
            {f.connectItems.map((r, i) => (
              <li key={i}>
                <a href="#">{r}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.footBottom}>
        <span>{f.copy}</span>
        <span className={styles.footBottomRight}>
          {f.right.map((r, i) => (
            <span key={i}>{r}</span>
          ))}
        </span>
      </div>
    </footer>
  );
}
