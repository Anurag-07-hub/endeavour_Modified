import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EndeavourBanner } from './components/EndeavourBanner';
import { RecruitmentBanner } from './components/RecruitmentBanner';
import { About } from './components/About';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { DomainsPage } from './pages/DomainsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { JoinUsPage } from './pages/JoinUsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SimulatorPage } from './pages/Simulator';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import { GestureProvider } from './context/GestureContext';
import { GestureController } from './components/GestureController';

function Home() {
  return (
    <main>
      <Hero />
      <EndeavourBanner />
      <RecruitmentBanner />
      <About />
      <Events />
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const isSimulator = location.pathname === '/simulator';

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-accent selection:text-white">
      {!isSimulator && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/recruit" element={<RecruitmentPage />} />
      </Routes>
      {!isSimulator && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <GestureProvider>
          <Router>
            <GestureController />
            <ScrollToTop />
            <AppContent />
          </Router>
        </GestureProvider>
      </CMSProvider>
    </AuthProvider>
  );
}

