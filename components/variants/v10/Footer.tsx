'use client';

import Image from 'next/image';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v10.module.css';

export function Footer() {
  const t = useT();
  const f = t.foot;
  const nav = t.nav;

  return (
    <footer className={styles.foot}>
      <div className={styles.footInner}>
        <span className={styles.footLogo}>
          <Image
            src="/assets/tdf-logo-v2.png"
            alt="Textile Development Foundation"
            width={44}
            height={44}
          />
        </span>

        <p className={styles.footTag}>{f.tag}</p>

        <div className={styles.footCols}>
          <div>
            <div className={styles.footColHead}>{f.explore}</div>
            <ul className={styles.footList}>
              <li><a href="#about">{nav.about}</a></li>
              <li><a href="#members">{nav.members}</a></li>
              <li><a href="#facilities">{nav.facilities}</a></li>
              <li><a href="#contact">{nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.footColHead}>{f.resources}</div>
            <ul className={styles.footList}>
              {f.resourceItems.map((x, i) => (
                <li key={i}><a href="#">{x}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.footColHead}>{f.connect}</div>
            <ul className={styles.footList}>
              {f.connectItems.map((x, i) => (
                <li key={i}><a href="#">{x}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* The ONE rust element in V10. Playfair italic 400 in muted rust. */}
        <div className={styles.footSignature}>Est. 1995 &middot; Solapur</div>

        <div>
          <div className={styles.footCopy}>{f.copy}</div>
          <div className={styles.footRight}>{f.right.join(' \u00b7 ')}</div>
        </div>
      </div>
    </footer>
  );
}
