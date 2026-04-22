'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v4.module.css';

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
                  width={48}
                  height={48}
                />
              </span>
              <span className={styles.footLogoText}>
                <span className={styles.footLogoTextL1}>
                  Textile Development Foundation
                </span>
                <span className={styles.footLogoTextL2}>Est. 1995 · Solapur</span>
              </span>
            </div>
            <p className={styles.footTag}>{f.tag}</p>
          </div>

          <div>
            <h5>— {f.explore}</h5>
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
            <h5>— {f.resources}</h5>
            <ul className={styles.footList}>
              {f.resourceItems.map((x, i) => (
                <li key={i}>
                  <a href="#">{x}</a>
                </li>
              ))}
            </ul>
            <h5 style={{ marginTop: 28 }}>— {f.connect}</h5>
            <ul className={styles.footList}>
              {f.connectItems.map((x, i) => (
                <li key={i}>
                  <a href="#">{x}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.footDateline}>
          Solapur <span className={styles.dotSep}>·</span> Maharashtra
          <span className={styles.dotSep}>·</span> 413006
          <span className={styles.dotSep}>·</span> Est. 1995
        </div>

        <div className={styles.footBottom}>
          <div>{f.copy}</div>
          <div>
            {f.right.map((x, i) => (
              <a key={i} href="#" style={{ marginLeft: i === 0 ? 0 : 14 }}>
                {i === 0 ? '' : '· '}
                {x}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
