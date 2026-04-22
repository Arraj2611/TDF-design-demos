'use client';

import clsx from 'clsx';
import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v2.module.css';

const MAP_SRC =
  'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const c = useT().contact;
  return (
    <section id="contact" className={clsx(styles.section, styles.contact)}>
      <div className={styles.container}>
        <Reveal className={clsx(styles.secHead)}>
          <div>
            <div className={styles.secKicker}>
              <span className="dash" />
              {c.kicker}
            </div>
            <h2 className={styles.secTitle}>{c.title}</h2>
          </div>
          <p className={styles.secLede}>{c.lede}</p>
        </Reveal>

        <div className={styles.contactGrid}>
          <div className={styles.contactLeft}>
            <div className={styles.contactBlock}>
              <h5>Secretariat</h5>
              <div className="big">Textile Development Foundation</div>
              <p>
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
              <h5>Direct lines</h5>
              <p>
                Mobile: <a href="tel:+919699123418">+91 96991 23418</a>
                <br />
                Email: <a href="mailto:tdf.textile@gmail.com">tdf.textile@gmail.com</a>
              </p>
            </div>
            <div className={styles.contactBlock}>
              <h5>Office hours</h5>
              <p>
                Monday – Saturday · 10:30 – 17:30
                <br />
                Closed 2nd &amp; 4th Saturdays · Public holidays
              </p>
            </div>
            <div className={styles.contactBlock}>
              <h5>Membership</h5>
              <p>
                Prospective members: application forms and the fee schedule are available on request.
                Processing takes 4–6 weeks.
              </p>
            </div>
          </div>
          <div className={styles.contactRight}>
            <iframe
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TDF Solapur location"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
