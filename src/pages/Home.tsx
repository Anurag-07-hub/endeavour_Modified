import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Events } from '../components/Events';
import { Gallery } from '../components/Gallery';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
