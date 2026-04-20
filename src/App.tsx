import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Events />
      <Gallery />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollVideoBackground />
      <div className="min-h-screen text-white selection:bg-brand-accent selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
