import styles from '@/styles/variants/v1.module.css';
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

export function V1Page() {
  return (
    <div className={styles.root}>
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
