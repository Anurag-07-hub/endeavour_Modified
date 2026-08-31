import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, Compass, Layers, Radio, Camera, Trophy, Users, MapPin } from 'lucide-react';
import { useParticlesBackground } from '../hooks/useParticlesBackground';
import { useCMS } from '../context/CMSContext';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';

export type GalleryCategory = 'all' | 'photoshoot' | 'cognizance' | 'iiit-una' | 'nit-jalandhar' | 'pec' | 'techfest-sliet' | 'technex';

interface BentoItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  category: GalleryCategory;
  title: string;
  description: string;
}

const bentoLayouts = [
  'md:col-span-2 md:row-span-2', // index 0 (large)
  'md:col-span-1 md:row-span-1', // index 1 (small)
  'md:col-span-1 md:row-span-2', // index 2 (tall)
  'md:col-span-2 md:row-span-1', // index 3 (wide)
  'md:col-span-1 md:row-span-1', // index 4 (small)
  'md:col-span-1 md:row-span-1', // index 5 (small)
  'md:col-span-2 md:row-span-2', // index 6 (large)
  'md:col-span-1 md:row-span-1', // index 7 (small)
  'md:col-span-1 md:row-span-1', // index 8 (small)
  'md:col-span-2 md:row-span-1', // index 9 (wide)
  'md:col-span-1 md:row-span-2', // index 10 (tall)
  'md:col-span-1 md:row-span-1', // index 11 (small)
  'md:col-span-2 md:row-span-1', // index 12 (wide)
];

const categoryLabels: { value: GalleryCategory; label: string; icon: React.ComponentType<any> }[] = [
  { value: 'all', label: 'All Memories', icon: Camera },
  { value: 'photoshoot', label: 'Annual Photoshoot', icon: Users },
  { value: 'cognizance', label: 'Cognizance', icon: Trophy },
  { value: 'iiit-una', label: 'IIIT Una', icon: MapPin },
  { value: 'nit-jalandhar', label: 'NIT Jalandhar', icon: MapPin },
  { value: 'pec', label: 'PEC', icon: Compass },
  { value: 'techfest-sliet', label: 'Techfest SLIET', icon: Layers },
  { value: 'technex', label: 'Technex', icon: Trophy },
];

export function GalleryPage() {
  const { gallery } = useCMS();
  
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedItem, setSelectedItem] = useState<{ type: 'image'|'video'; url: string } | null>(null);
  const [isLight, setIsLight] = useState(false);
  const canvasRef = useParticlesBackground();

  // Sync theme changes dynamically
  useEffect(() => {
    const checkTheme = () => setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    checkTheme();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Hide Navbar when lightbox is open
  useEffect(() => {
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      if (selectedItem) {
        navbar.style.opacity = '0';
        navbar.style.pointerEvents = 'none';
      } else {
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
      }
    }
  }, [selectedItem]);

  // Enrich gallery items with categories and text labels
  const enrichedGallery = useMemo(() => {
    return gallery
      .filter((item) => item.type !== 'empty' && item.url)
      .map((item, index) => {
        let category: GalleryCategory = 'photoshoot';
        let title = 'Team Photoshoot';
        let description = 'Team Endeavour official club photoshoot and group memories.';

        const lowerUrl = item.url.toLowerCase();
        if (lowerUrl.includes('annual photoshoot') || lowerUrl.includes('annual_photoshoot')) {
          category = 'photoshoot';
          title = `Annual Photoshoot #${index + 1}`;
          description = 'Official group portrait and member photoshoots of Team Endeavour.';
        } else if (lowerUrl.includes('cognizance_24')) {
          category = 'cognizance';
          title = `Cognizance 24 #${index + 1}`;
          description = 'Robotics competition and achievements at Cognizance, IIT Roorkee 2024.';
        } else if (lowerUrl.includes('cognizance_25')) {
          category = 'cognizance';
          title = `Cognizance 25 #${index + 1}`;
          description = 'Exhibition runs, all-terrain rovers, and team presentations at Cognizance, IIT Roorkee 2025.';
        } else if (lowerUrl.includes('cognizance_26')) {
          category = 'cognizance';
          title = `Cognizance 26 #${index + 1}`;
          description = 'Advanced aerial drone challenges and robotics engineering showcase at Cognizance, IIT Roorkee 2026.';
        } else if (lowerUrl.includes('iiit una') || lowerUrl.includes('iiit_una')) {
          category = 'iiit-una';
          title = `IIIT Una Exhibition #${index + 1}`;
          description = 'Robotics project display, autonomous models, and guest interactions at IIIT Una tech fest.';
        } else if (lowerUrl.includes('nit jalandhar') || lowerUrl.includes('nit_jalandhar')) {
          category = 'nit-jalandhar';
          title = `NIT Jalandhar Challenge #${index + 1}`;
          description = 'Testing robots and competing in national challenges at NIT Jalandhar.';
        } else if (lowerUrl.includes('pec_25')) {
          category = 'pec';
          title = `PEC 2025 #${index + 1}`;
          description = 'All-terrain suspension runs and autonomous mapping demonstrations at PecFest, PEC Chandigarh 2025.';
        } else if (lowerUrl.includes('techfest sliet') || lowerUrl.includes('techfest_sliet')) {
          category = 'techfest-sliet';
          title = `Techfest SLIET #${index + 1}`;
          description = 'Drone flight loops and quadcopter obstacle course compliance at Techfest SLIET.';
        } else if (lowerUrl.includes('technex_23')) {
          category = 'technex';
          title = `Technex 2023 #${index + 1}`;
          description = 'Podium wins, trophy presentation, and national level robotics triumph at Technex, IIT BHU 2023.';
        } else if (lowerUrl.includes('technex_26')) {
          category = 'technex';
          title = `Technex 2026 #${index + 1}`;
          description = 'Advanced robotics showcase and team participation at Technex, IIT BHU 2026.';
        } else {
          // Fallback for custom user inputs based on general matches or modulo index
          if (lowerUrl.includes('technex') || lowerUrl.includes('win')) {
            category = 'technex';
            title = 'Technex Competition';
            description = 'National robotics competition runs and podium achievements at IIT BHU.';
          } else if (lowerUrl.includes('cognizance')) {
            category = 'cognizance';
            title = 'Cognizance Competition';
            description = 'Advanced robotics challenge participation at IIT Roorkee.';
          } else if (lowerUrl.includes('iiit')) {
            category = 'iiit-una';
            title = 'IIIT Exhibition';
            description = 'Robotics project showcases at IIIT.';
          } else if (lowerUrl.includes('nit')) {
            category = 'nit-jalandhar';
            title = 'NIT Exhibition';
            description = 'Robotics project showcases at NIT.';
          } else if (lowerUrl.includes('pec')) {
            category = 'pec';
            title = 'PEC Competition';
            description = 'Competitions and robotic runs at PEC.';
          } else if (lowerUrl.includes('techfest')) {
            category = 'techfest-sliet';
            title = 'Techfest Showcase';
            description = 'Institutional tech fest exhibition and project displays.';
          } else {
            // General index fallback
            const rem = index % 7;
            if (rem === 1) {
              category = 'cognizance';
              title = 'Cognizance Event';
              description = 'Competing and showcasing custom robotics at Cognizance.';
            } else if (rem === 2) {
              category = 'iiit-una';
              title = 'IIIT Una Showcase';
              description = 'Demonstrating custom automated platforms at IIIT Una.';
            } else if (rem === 3) {
              category = 'nit-jalandhar';
              title = 'NIT Jalandhar Showcase';
              description = 'Representing Endeavour club in robotics event at NIT Jalandhar.';
            } else if (rem === 4) {
              category = 'pec';
              title = 'PEC Showcase';
              description = 'Presenting engineering projects and challenges at PEC.';
            } else if (rem === 5) {
              category = 'techfest-sliet';
              title = 'Techfest Showcase';
              description = 'Exhibiting flight controllers and chassis mechanics at Techfest SLIET.';
            } else if (rem === 6) {
              category = 'technex';
              title = 'Technex Competition';
              description = 'National level robotics design validation at Technex IIT BHU.';
            } else {
              category = 'photoshoot';
              title = 'Club Photo session';
              description = 'Capturing team portrait and engineering sessions.';
            }
          }
        }

        return {
          id: item.id || `gallery-item-${index}`,
          type: item.type as 'image' | 'video',
          url: item.url,
          category,
          title,
          description,
        };
      });
  }, [gallery]);

  // Filter gallery items based on active category selection
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return enrichedGallery;
    return enrichedGallery.filter((item) => item.category === activeCategory);
  }, [enrichedGallery, activeCategory]);

  return (
    <div 
      className={`min-h-screen w-full relative transition-colors duration-500 pb-24 pt-28 px-6 sm:px-12
        ${isLight ? 'bg-[#ffffff] text-[#111827]' : 'bg-brand-bg text-white'}`}
      style={{
        backgroundImage: 'linear-gradient(to right, var(--color-grid-lines) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid-lines) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      {/* Grainy Noise Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22128%22 height=%22128%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.95%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22128%22 height=%22128%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px'
        }}
      />

      {/* Sparkles Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header Block */}
        <div className="text-center md:text-left space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c41515] font-bold block">
            MEMORIAL VAULT
          </span>
          <h1 className="font-righteous text-[48px] sm:text-[68px] font-black uppercase tracking-[-2px] sm:tracking-[-3px] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gray-500 style-heading">
            <span className={isLight ? 'text-gray-900' : 'text-white'}>OUR GALLERY</span>
          </h1>
          <p className={`font-sans text-base max-w-2xl leading-relaxed ${isLight ? 'text-gray-600' : 'text-brand-muted'}`}>
            Explore visual records from Sant Longowal Institute of Engineering & Technology's official robotics club. Witness our development iterations, field runs, and national competitions.
          </p>
        </div>

        {/* Filter Categories Header */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-4 scrollbar-none justify-center md:justify-start">
          {categoryLabels.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300
                  ${isSelected
                    ? 'bg-brand-accent border-brand-accent text-white shadow-lg shadow-brand-accent/20'
                    : isLight
                      ? 'bg-[#f9fafb] border-[#e5e7eb] text-gray-600 hover:border-gray-300 hover:bg-gray-100/50'
                      : 'bg-white/[0.02] border-white/5 text-brand-muted hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px] md:auto-rows-[250px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const gridClass = bentoLayouts[index % bentoLayouts.length];
              const isLarge = gridClass.includes('row-span-2');
              const isWide = gridClass.includes('col-span-2');

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden rounded-3xl p-2 cursor-pointer flex flex-col justify-between transition-all duration-500
                    ${gridClass}
                    ${isLight 
                      ? 'bg-[#ffffff] border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:border-gray-300' 
                      : 'bg-[#0d0f17]/90 border border-white/5 shadow-2xl hover:border-white/10'}`}
                  onClick={() => setSelectedItem({ type: item.type, url: item.url })}
                >
                  {/* Media Content */}
                  <div className="absolute inset-2 overflow-hidden rounded-2xl z-0">
                    {item.type === 'video' ? (
                      <video src={item.url} autoPlay loop muted playsInline className="h-full w-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                    ) : (
                      <img src={item.url} alt={item.title} className="h-full w-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                    )}

                    {/* Dark gradient shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                  </div>

                  {/* Top Floating Badge */}
                  <div className="relative z-10 p-4 flex justify-between items-start w-full">
                    <span className="bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-widest font-bold uppercase text-white">
                      {item.category}
                    </span>
                    <div className="bg-black/60 border border-white/10 backdrop-blur-md p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Text Disclosures */}
                  <div className="relative z-10 p-4 text-left space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-righteous text-white text-base uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      {item.title}
                    </h3>
                    
                    {/* Render description in larger boxes only */}
                    {(isLarge || isWide) && (
                      <p className="text-white/70 text-xs font-sans max-w-md line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {item.description}
                      </p>
                    )}
                    
                    <span className="block font-mono text-[8px] tracking-widest text-[#c41515] uppercase font-bold pt-1">
                      IMG_0{index + 1} // STRUCT_SPEC
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <ScrollExpandMedia
              mediaType={selectedItem.type === 'video' ? 'video' : 'image'}
              mediaSrc={selectedItem.url}
              bgImageSrc={selectedItem.type === 'image' ? selectedItem.url : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop'}
              title="ENDEAVOUR GALLERY"
              date="Memories"
              scrollToExpand="Scroll to Expand"
              onClose={() => setSelectedItem(null)}
            >
              <div className="max-w-4xl mx-auto text-center mt-[20vh] md:mt-[30vh] px-4">
                <h2 className="text-3xl font-bold mb-6 text-white font-bebas tracking-wider uppercase">
                  About This Memory
                </h2>
                <p className="text-lg text-white/80 font-sans leading-relaxed">
                  Our gallery showcases the journey of Endeavour. 
                  Every component, every event, and every memory is carefully preserved.
                  Scroll to fully expand and immerse yourself in the moment.
                </p>
              </div>
            </ScrollExpandMedia>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
