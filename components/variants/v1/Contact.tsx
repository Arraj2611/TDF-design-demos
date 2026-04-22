'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v1.module.css';

const MAP_SRC = 'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const t = useT().contact;
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div className={styles.secKicker}>
            <span className="num">— {t.num}</span>
            <span>{t.kicker}</span>
          </div>
          <div>
            <h2 className={clsx(styles.secTitle, 'serif')}>{t.title}</h2>
            <p className={styles.secLede}>{t.lede}</p>
          </div>
        </Reveal>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.contactBlock}>
              <h4>— Secretariat</h4>
              <div className="big">Textile Development Foundation</div>
              <p style={{ marginTop: 10 }}>
                P-28, MIDC Akkalkot Road
                <br />
                Near Police Thane
                <br />
                Solapur — 413 006
                <br />
                Maharashtra, India
              </p>
            </div>
            <div className={styles.contactBlock}>
              <h4>— Office Hours</h4>
              <p>
                Monday – Saturday · 10:30 – 17:30
                <br />
                Closed on 2nd &amp; 4th Saturdays, public holidays
              </p>
            </div>
            <div className={styles.contactBlock}>
              <h4>— Direct Lines</h4>
              <p>
                Mobile: <a href="tel:+919699123418">+91 96991 23418</a>
                <br />
                Email: <a href="mailto:tdf.textile@gmail.com">tdf.textile@gmail.com</a>
              </p>
            </div>
            <div className={styles.contactBlock}>
              <h4>— Membership enquiries</h4>
              <p>
                Prospective member units may download the application form and the current year&apos;s
                fee schedule from the <a href="#">members handbook</a>. Processing takes 4–6 weeks
                after the committee&apos;s monthly sitting.
              </p>
            </div>
          </div>

          <div className={styles.contactMap}>
            <div className={styles.mapFrame}>
              <iframe
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TDF Solapur location"
                allowFullScreen
              />
            </div>
            <div className={styles.mapCaption}>
              <span>◦ 17.6599° N, 75.9064° E</span>
              <a
                href="https://share.google/wTinKm1BvN8QmLHzG"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
