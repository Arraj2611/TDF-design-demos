'use client';

import { useT } from '@/components/shared/LangProvider';
import { Reveal } from '@/components/shared/Reveal';
import styles from '@/styles/variants/v3.module.css';

const MAP_SRC =
  'https://www.google.com/maps?q=P-28+MIDC+Akkalkot+Road+Solapur+413006&output=embed';

export function Contact() {
  const t = useT();
  const c = t.contact;
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.sectionRule} />
      <Reveal>
        <div className={styles.secHead}>
          <p className={styles.kicker}>{c.kicker}</p>
          <span className={styles.secNum}>№ {c.num}</span>
        </div>
        <h2 className={styles.secTitle}>{c.title}</h2>
        <p className={styles.secLede}>{c.lede}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className={styles.contactGrid}>
          <iframe
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TDF Solapur location"
          />
          <div className={styles.contactInfo}>
            <div className={styles.contactBlock}>
              <span className={styles.label}>Secretariat</span>
              <h4>Textile Development Foundation</h4>
              <p>
                P-28, MIDC Akkalkot Road
                <br />
                Solapur 413 006, Maharashtra
              </p>
            </div>
            <div className={styles.contactBlock}>
              <span className={styles.label}>Direct lines</span>
              <p>
                <a href={`tel:${t.top.phone.replace(/\s+/g, '')}`}>{t.top.phone}</a>
                <br />
                <a href={`mailto:${t.top.email}`}>{t.top.email}</a>
              </p>
            </div>
            <div className={styles.contactBlock}>
              <span className={styles.label}>Office hours</span>
              <p>Monday – Saturday · 10:30 – 17:30</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
