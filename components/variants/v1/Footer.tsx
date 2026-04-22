'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v1.module.css';

export function Footer() {
  const t = useT().foot;
  const nav = useT().nav;
  return (
    <footer className={styles.foot}>
      <div className={styles.container}>
        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>
                <Image
                  src="/assets/tdf-logo-v2.png"
                  alt="TDF"
                  width={52}
                  height={52}
                />
              </span>
              <span className={styles.logoText}>
                <span className={styles.logoTextL1}>Textile Development Foundation</span>
                <span className={styles.logoTextL2}>
                  The Association of Textile Manufacturers
                </span>
              </span>
            </div>
            <p>{t.tag}</p>
          </div>
          <div>
            <h5>— {t.explore}</h5>
            <ul>
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
            <h5>— {t.resources}</h5>
            <ul>
              {t.resourceItems.map((x, i) => (
                <li key={i}>
                  <a href="#">{x}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>— {t.connect}</h5>
            <ul>
              {t.connectItems.map((x, i) => (
                <li key={i}>
                  <a href="#">{x}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.footBottom}>
          <div>{t.copy}</div>
          <div className={clsx('right')}>
            {t.right.map((x, i) => (
              <a key={i} href="#">
                {x}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
