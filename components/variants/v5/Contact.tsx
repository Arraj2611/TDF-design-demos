'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import { WaxSeal } from './WaxSeal';
import styles from '@/styles/variants/v5.module.css';

const MAP_SRC =
  'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const c = useT().contact;
  const top = useT().top;
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.doubleRule} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.marginL} aria-hidden="true">
            VIII
          </div>
          <div className={styles.marginRowMobile}>
            <span>VIII</span>
            <span>f. VIII</span>
          </div>
          <div className={styles.col}>
            <Reveal className={clsx(styles.secHead)}>
              <div className={styles.secKickerRow}>
                <span className={styles.secKicker}>{c.kicker}</span>
                <span className={styles.secKickerDot} />
                <span className={styles.secKickerNum}>No. {c.num}</span>
              </div>
              <h2 className={styles.secTitle}>{c.title}</h2>
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
                  <div className={styles.contactK}>Visiting Hours</div>
                  <div className={styles.contactV}>
                    Monday to Saturday{'\n'}
                    10:30 &mdash; 17:30 IST{'\n'}
                    Closed on public holidays
                  </div>
                </div>
                <div className={styles.contactRow}>
                  <div className={styles.contactK}>Established</div>
                  <div className={styles.contactV}>{top.est}</div>
                </div>
              </Reveal>

              <Reveal delay={0.08} className={clsx(styles.contactMap)}>
                <div className={styles.contactMapFrame}>
                  <iframe
                    title="TDF Solapur office on Google Maps"
                    src={MAP_SRC}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className={styles.contactMapSeal}>
                    <WaxSeal
                      size={68}
                      label="SOLAPUR"
                      title="Ledgered at Akkalkot Road, MIDC Solapur"
                    />
                  </div>
                </div>
                <div className={styles.contactMapCap}>
                  <span>Lat 17.6599&deg; N &middot; Lng 75.9064&deg; E</span>
                  <a
                    href="https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open map &rarr;
                  </a>
                </div>
              </Reveal>
            </div>

            <div className={styles.secFoot}>
              <span className={styles.secFootSign}>
                <span className={styles.secFootMono}>Folio VIII</span>
                <span>&mdash; walk-ins welcomed between 10:30 and 17:30 on working days.</span>
              </span>
              <span className={styles.secFootMono}>
                f. VIII &middot; Contact the Secretariat
              </span>
            </div>
          </div>
          <div className={styles.marginR} aria-hidden="true">
            f. VIII &middot; Of Correspondence
          </div>
        </div>
      </div>
    </section>
  );
}
