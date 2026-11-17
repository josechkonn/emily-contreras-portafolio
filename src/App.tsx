import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Intro } from '@/components/Intro';
import { Nav } from '@/components/Nav';
import { Projects } from '@/components/Projects';
import { Hero } from '@/components/Top';
import { Toolkit } from '@/components/Toolkit';
import { useSite } from '@/lib/i18n';

export default function App() {
  const site = useSite();

  return (
    <>
      <a href="#contenido" className="skip-link">{site.ui.skip}</a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Intro />
        <Toolkit />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
