import styles from '@/styles/variants/v9.module.css';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { About } from './About';
import { Members } from './Members';
import { Committee } from './Committee';
import { Facilities } from './Facilities';
import { News } from './News';
import { Events } from './Events';
import { Solapur } from './Solapur';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { GridOverlay } from './GridOverlay';

export function V9Page() {
  return (
    <div className={styles.root}>
      <GridOverlay />
      <Nav />
      <main>
        <Hero />
        <About />
        <Members />
        <Committee />
        <Facilities />
        <News />
        <Events />
        <Solapur />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
