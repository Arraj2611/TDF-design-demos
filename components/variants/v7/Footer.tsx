'use client';

import Image from 'next/image';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v7.module.css';

export function Footer() {
  const t = useT();
  const f = t.foot;
  const nav = t.nav;

  return (
    <footer className={styles.foot}>
      <div className={styles.container}>
        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            <div className={styles.footLogo}>
              <span className={styles.footLogoMark}>
                <Image
                  src="/assets/tdf-logo-v2.png"
                  alt="Textile Development Foundation"
                  width={46}
                  height={46}
                />
              </span>
              <span className={styles.footLogoText}>
                <span className={styles.footLogoL1}>TDF</span>
                <span className={styles.footLogoL2}>Data Sector Brief &middot; Solapur</span>
              </span>
            </div>
            <p className={styles.footTag}>{f.tag}</p>
          </div>

          <div>
            <div className={styles.footColHead}>&mdash; {f.explore}</div>
            <ul className={styles.footList}>
              <li><a href="#about">{nav.about}</a></li>
              <li><a href="#members">{nav.members}</a></li>
              <li><a href="#committee">{nav.board}</a></li>
              <li><a href="#facilities">{nav.facilities}</a></li>
              <li><a href="#news">{nav.news}</a></li>
              <li><a href="#events">{nav.events}</a></li>
              <li><a href="#solapur">{nav.solapur}</a></li>
              <li><a href="#contact">{nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.footColHead}>&mdash; {f.resources}</div>
            <ul className={styles.footList}>
              {f.resourceItems.map((x, i) => (
                <li key={i}><a href="#">{x}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.footColHead}>&mdash; {f.connect}</div>
            <ul className={styles.footList}>
              {f.connectItems.map((x, i) => (
                <li key={i}><a href="#">{x}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.footStamp}>
          TDF &middot; Data Sector Brief &middot; Solapur 2026
        </div>

        <div className={styles.footBottom}>
          <div>{f.copy}</div>
          <div>
            {f.right.map((x, i) => (
              <span key={i}>
                {i > 0 ? <span className="sep">&middot;</span> : null}
                <a href="#">{x}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
