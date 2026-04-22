'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v10.module.css';

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
          <div>
            <div className={styles.secKicker}>{c.kicker}</div>
            <h2 className={styles.secTitle}>{c.title}</h2>
            <p className={styles.secLede}>{c.lede}</p>
          </div>
          <div className={styles.secNum}>08 / 08</div>
        </div>
      </Reveal>

      <div className={styles.contactGrid}>
        <Reveal delay={0.04}>
          <div className={styles.contactList}>
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
              <div className={clsx(styles.contactV, styles.email)}>
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
    </section>
  );
}
