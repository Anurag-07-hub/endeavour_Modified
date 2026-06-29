import { motion, AnimatePresence } from 'framer-motion';

export function DuskyTransition({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute inset-0 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{
              // Base blur and subtle overall whiteness
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              // Vintage white smoke vignette on the corners
              background: 'radial-gradient(circle at center, transparent 30%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 1) 100%)',
              boxShadow: 'inset 0 0 100px 50px rgba(255, 255, 255, 0.9)'
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
