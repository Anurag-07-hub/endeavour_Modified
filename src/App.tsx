import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { GalleryPage } from './pages/GalleryPage';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Events />
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
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
