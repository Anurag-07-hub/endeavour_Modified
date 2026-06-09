import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { ScrollToTop } from './components/ScrollToTop';
import { JoinUsPage } from './pages/JoinUsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import { GestureProvider } from './context/GestureContext';
import { GestureController } from './components/GestureController';

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
    <AuthProvider>
      <CMSProvider>
        <GestureProvider>
          <Router>
            <GestureController />
            <ScrollToTop />
            <div className="min-h-screen text-white selection:bg-brand-accent selection:text-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </GestureProvider>
      </CMSProvider>
    </AuthProvider>
  );
}
