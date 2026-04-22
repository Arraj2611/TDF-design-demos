'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v6.module.css';

const MAP_SRC =
  'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const c = useT().contact;
  const top = useT().top;

  return (
    <section id="contact" className={clsx(styles.section, styles.container)}>
      <Reveal>
        <div className={styles.partLine}>
          <span className="num">IX</span>
          <span>Part Nine</span>
          <span className="dot" aria-hidden="true" />
          <span>Correspondence</span>
        </div>
        <h2 className={styles.secTitle}>{c.title}</h2>
        <div className={styles.secTitleRule} aria-hidden="true" />
        <p className={styles.secLede}>{c.lede}</p>
      </Reveal>

      <div className={styles.contactGrid}>
        <Reveal className={clsx(styles.contactBook)}>
          <div className={styles.contactRow}>
            <div className={styles.contactK}>Secretariat</div>
            <div className={styles.contactV}>
              P-28, MIDC Akkalkot Road{'\n'}
              Solapur 413006{'\n'}
              Maharashtra, India
            </div>
          </div>
          <div className={styles.contactRow}>
            <div className={styles.contactK}>Telephone</div>
            <div className={styles.contactV}>
              <a href={`tel:${top.phone.replace(/\s+/g, '')}`}>{top.phone}</a>
            </div>
          </div>
          <div className={styles.contactRow}>
            <div className={styles.contactK}>Correspondence</div>
            <div className={styles.contactV}>
              <a href={`mailto:${top.email}`}>{top.email}</a>
            </div>
          </div>
          <div className={styles.contactRow}>
            <div className={styles.contactK}>Hours</div>
            <div className={styles.contactV}>
              Monday – Saturday{'\n'}
              10:30 – 17:30 IST
            </div>
          </div>
          <div className={styles.contactRow}>
            <div className={styles.contactK}>Established</div>
            <div className={styles.contactV}>{top.est}</div>
          </div>
          <div className={styles.contactRow}>
            <div className={styles.contactK}>Coordinates</div>
            <div className={styles.contactV}>17.6599&deg; N &middot; 75.9064&deg; E</div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={styles.contactMap}>
            <div className={styles.contactMapFrame}>
              <iframe
                title="TDF Solapur office on Google Maps"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className={styles.contactMapCap}>
              <span>Plate IX &middot; Site &middot; MIDC Akkalkot Road</span>
              <a
                href="https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open map &rarr;
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className={styles.secFoot}>
        <span>Part IX &middot; No. {c.num} &middot; Correspondence</span>
        <span>Walk-ins <em>10:30 – 17:30</em> &middot; working days</span>
      </div>
    </section>
  );
}
