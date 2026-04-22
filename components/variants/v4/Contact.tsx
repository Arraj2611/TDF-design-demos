'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v4.module.css';

const MAP_SRC =
  'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const c = useT().contact;
  const top = useT().top;
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.secPageNum}>§ VIII · p.08</div>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secMark}>§ VIII</div>
          <div>
            <div className={styles.secKickerRow}>
              <span className={styles.secKicker}>{c.kicker}</span>
              <span className={styles.secKickerDot} />
              <span className={styles.secKickerNum}>№ {c.num}</span>
            </div>
            <h2 className={styles.secTitle}>{c.title}</h2>
            <p className={styles.secLede}>{c.lede}</p>
          </div>
        </Reveal>

        <div className={styles.contactGrid}>
          <Reveal>
            <div className={styles.contactBlock}>
              <div className={styles.contactBlockH}>— Secretariat</div>
              <div className={styles.contactBig}>
                Textile Development Foundation
              </div>
              <div className={styles.contactBody}>
                P-28, MIDC Akkalkot Road
                <br />
                Solapur 413006
                <br />
                Maharashtra, India
              </div>
            </div>

            <div className={styles.contactBlock}>
              <div className={styles.contactBlockH}>— Direct</div>
              <div className={styles.contactBody}>
                <a href={`tel:${top.phone.replace(/\s+/g, '')}`}>{top.phone}</a>
                <br />
                <a href={`mailto:${top.email}`}>{top.email}</a>
              </div>
            </div>

            <div className={styles.contactBlock}>
              <div className={styles.contactBlockH}>— Visiting Hours</div>
              <div className={styles.contactBody}>
                Monday to Saturday
                <br />
                10:30 — 17:30 IST
                <br />
                Closed on public holidays
              </div>
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
            </div>
            <div className={styles.contactMapCaption}>
              <span>Lat 17.6599° N · Lng 75.9064° E</span>
              <a
                href="https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open map →
              </a>
            </div>
          </Reveal>
        </div>

        <div className={styles.secFoot}>
          <span>
            Footnote<span className={styles.dotSep}> · </span>
            MIDC estate · short walk from many member units
          </span>
          <span>§ VIII · Contact · p.08</span>
        </div>
      </div>
    </section>
  );
}
