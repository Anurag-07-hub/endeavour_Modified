import { motion, AnimatePresence } from 'motion/react';
import { X, Hand, ArrowDown, ArrowUp, PowerOff, Smartphone, Monitor } from 'lucide-react';

interface GestureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GestureGuideModal({ isOpen, onClose }: GestureGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-brand-bg/95 border border-brand-accent/30 p-6 md:p-8 rounded-2xl max-w-lg w-full shadow-[0_0_40px_rgba(164,5,5,0.25)]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-[2px] flex items-center gap-3">
                <Hand className="text-brand-accent" />
                Gesture Guide
              </h2>
              <button 
                onClick={onClose}
                className="text-brand-muted hover:text-brand-accent transition-colors"
                aria-label="Close guide"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Enabling / Disabling */}
              <div className="space-y-3">
                <h3 className="text-sm text-brand-accent font-bold uppercase tracking-[1px] border-b border-white/10 pb-2 flex gap-2 items-center">
                  <Monitor className="w-4 h-4" /> <Smartphone className="w-4 h-4" />
                  Turning On & Off
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  Toggle gesture control using the <strong className="text-white">Gestures ON/OFF</strong> button in the navigation menu on both <strong className="text-white">PC and Phone</strong>. Ensure your device has a front-facing camera.
                </p>
              </div>

              {/* Gestures List */}
              <div className="space-y-3">
                <h3 className="text-sm text-brand-accent font-bold uppercase tracking-[1px] border-b border-white/10 pb-2">
                  Finger Gestures
                </h3>
                
                <div className="grid gap-3">
                  <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-brand-accent/30 transition-colors">
                    <div className="text-3xl">☝️</div>
                    <div>
                      <div className="text-white font-bold text-sm uppercase tracking-[1px] flex items-center gap-2">
                        Index Finger Up <ArrowDown className="w-4 h-4 text-brand-accent" />
                      </div>
                      <div className="text-brand-muted text-xs mt-1">Scrolls the page downwards.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-brand-accent/30 transition-colors">
                    <div className="text-3xl">✌️</div>
                    <div>
                      <div className="text-white font-bold text-sm uppercase tracking-[1px] flex items-center gap-2">
                        Peace Sign <ArrowUp className="w-4 h-4 text-brand-accent" />
                      </div>
                      <div className="text-brand-muted text-xs mt-1">Scrolls the page upwards.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-brand-accent/30 transition-colors">
                    <div className="text-3xl">🖐️</div>
                    <div>
                      <div className="text-white font-bold text-sm uppercase tracking-[1px] flex items-center gap-2">
                        Four Fingers Up <PowerOff className="w-4 h-4 text-brand-accent" />
                      </div>
                      <div className="text-brand-muted text-xs mt-1">Instantly turns off gesture controls.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-brand-accent/30 transition-colors">
                    <div className="text-3xl">✋</div>
                    <div>
                      <div className="text-white font-bold text-sm uppercase tracking-[1px]">
                        Manual Touch
                      </div>
                      <div className="text-brand-muted text-xs mt-1">Touching the screen on mobile instantly overrides and stops gesture scrolling.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-brand-accent text-brand-bg font-black uppercase tracking-[1.5px] text-sm rounded-md hover:bg-white hover:text-brand-bg transition-colors duration-300"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
