'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { useT } from '@/components/shared/LangProvider';
import styles from '@/styles/variants/v9.module.css';

export function Footer() {
  const t = useT();
  const f = t.foot;
  const nav = t.nav;

  return (
    <footer className={styles.foot}>
      <div className={styles.footInner}>
        <div className={styles.footTopRow}>
          <span className={styles.footLogo}>
            <Image
              src="/assets/tdf-logo-v2.png"
              alt="Textile Development Foundation"
              width={56}
              height={56}
            />
          </span>
          <p className={styles.footTag}>{f.tag}</p>
        </div>

        <div className={styles.footCols}>
          <div>
            <div className={styles.footColHead}>{f.explore}</div>
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

        <div className={styles.footLine}>
          <span>Solapur</span>
          <span className={styles.footLineSep} aria-hidden="true">&middot;</span>
          <span>Maharashtra</span>
          <span className={styles.footLineSep} aria-hidden="true">&middot;</span>
          <span>413006</span>
          <span className={styles.footRedMark} aria-hidden="true" />
          <span>Est. 1995</span>
        </div>

        <div className={styles.footBottom}>
          <div>{f.copy}</div>
          <div className={styles.footRight}>
            {f.right.map((x, i) => (
              <Fragment key={i}>
                {i > 0 ? (
                  <span className={styles.footLineSep} aria-hidden="true">&middot;</span>
                ) : null}
                <a href="#">{x}</a>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
