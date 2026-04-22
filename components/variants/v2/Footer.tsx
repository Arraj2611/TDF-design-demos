'use client';

import Image from 'next/image';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v2.module.css';

export function Footer() {
  const t = useT();
  const f = t.foot;
  return (
    <footer className={styles.foot}>
      <div className={styles.container}>
        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            <div className={styles.brand}>
              <div className={styles.brandMark}>
                <Image
                  src="/assets/tdf-logo-v2.png"
                  alt="TDF"
                  width={52}
                  height={52}
                />
              </div>
              <div className={styles.brandText}>
                <div className={styles.brandL1}>Textile Development Foundation</div>
                <div className={styles.brandL2}>The Association of Textile Manufacturers</div>
              </div>
            </div>
            <p>{f.tag}</p>
          </div>
          <div>
            <h5>{f.explore}</h5>
            <ul>
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
                <a href="#solapur">{t.nav.solapur}</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>{f.resources}</h5>
            <ul>
              {f.resourceItems.map((x, i) => (
                <li key={i}>
                  <a href="#">{x}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{f.connect}</h5>
            <ul>
              {f.connectItems.map((x, i) => (
                <li key={i}>
                  <a href="#">{x}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.footBottom}>
          <div>{f.copy}</div>
          <div className="right">
            {f.right.map((x, i) => (
              <span key={i}>{x}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
