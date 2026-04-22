'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { BinaryStrip } from './BinaryStrip';
import styles from '@/styles/variants/v9.module.css';

// Hand-tuned binary pattern for Section VIII.
const PATTERN: readonly (0 | 1)[] = [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0];

// Hoisted: static map URL — never changes.
const MAP_SRC =
  'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const c = useT().contact;
  const top = useT().top;

  return (
    <section id="contact" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.secHead}>
          <BinaryStrip roman="VIII" pattern={PATTERN} label={`No. ${c.num}`} />
          <h2 className={styles.secTitle}>{c.title}</h2>
          <p className={styles.secLede}>{c.lede}</p>
        </div>
      </Reveal>

      <div className={styles.contactGrid}>
        <Reveal delay={0.04}>
          <div className={styles.contactBook}>
            <div className={styles.contactRow}>
              <div className={styles.contactK}>Address</div>
              <div className={styles.contactV}>
                {'P-28, MIDC Akkalkot Road\nSolapur 413006\nMaharashtra'}
              </div>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.contactK}>Telephone</div>
              <div className={styles.contactV}>
                <a href={`tel:${top.phone.replace(/\s+/g, '')}`}>{top.phone}</a>
              </div>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.contactK}>Email</div>
              <div className={clsx(styles.contactV, styles.email, 'email')}>
                <a href={`mailto:${top.email}`}>{top.email}</a>
              </div>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.contactK}>Hours</div>
              <div className={styles.contactV}>
                {'Monday \u2013 Saturday\n10:30 \u2013 17:30 IST'}
              </div>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.contactK}>Established</div>
              <div className={styles.contactV}>{top.est}</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={styles.contactMap}>
            <iframe
              title="TDF Solapur office on Google Maps"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>

      <div className={styles.secFoot}>
        <span>VIII &middot; Correspondence &middot; No. {c.num}</span>
        <span>Walk-ins <em>10:30 &ndash; 17:30</em> &middot; working days</span>
      </div>
    </section>
  );
}
