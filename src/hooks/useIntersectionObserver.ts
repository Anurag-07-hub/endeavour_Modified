import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  { threshold = 0, rootMargin = '0px', freezeOnceVisible = false }: UseIntersectionObserverProps = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, rootMargin };
    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry);
    }, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, rootMargin, frozen]);

  return entry;
}
export default useIntersectionObserver;
