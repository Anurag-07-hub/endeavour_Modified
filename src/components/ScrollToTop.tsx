import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll behavior to 'auto' to bypass CSS smooth scrolling
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Immediate synchronous reset
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Fallback reset on next frame to handle dynamic page heights/rendering
    const handle = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Restore original scroll behavior
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    });

    return () => {
      cancelAnimationFrame(handle);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [pathname]);

  return null;
}
