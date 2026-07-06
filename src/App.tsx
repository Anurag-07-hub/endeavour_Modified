import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EndeavourBanner } from './components/EndeavourBanner';
import { RecruitmentBanner } from './components/RecruitmentBanner';
import { About } from './components/About';
import { Events } from './components/Events';
import { JoinUsCTA } from './components/JoinUsCTA';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { DomainsPage } from './pages/DomainsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';
import { JoinUsPage } from './pages/JoinUsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SimulatorPage } from './pages/Simulator';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
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
      <JoinUsCTA />
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const isSimulator = location.pathname === '/simulator';
  const isAdmin = location.pathname.startsWith('/admin');
  
  const showCurtainReveal = !isSimulator && !isAdmin;

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-accent selection:text-white">
      <div className="relative w-full">
        <main className={`w-full bg-brand-bg ${showCurtainReveal ? 'sticky bottom-0 z-0' : 'relative z-10'}`}>
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
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </main>
        
        {!isSimulator && (
          <div className={showCurtainReveal ? "relative z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] bg-[#07080a]" : ""}>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <GestureProvider>
          <Router>
            <CustomCursor />
            <GestureController />
            <ScrollToTop />
            <AppContent />
          </Router>
        </GestureProvider>
      </CMSProvider>
    </AuthProvider>
  );
}

