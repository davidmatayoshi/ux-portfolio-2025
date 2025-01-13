import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  callback: (id: string) => void,
  options = {
    // Increase threshold for more accurate tracking
    threshold: [0.2, 0.5, 0.8],
    // Adjust rootMargin to better handle section transitions
    rootMargin: '-20% 0px -20% 0px'
  }
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const activeSection = useRef<string>('');

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      // Sort entries by intersection ratio to get the most visible section
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections[0];
        const newSection = mostVisible.target.id;
        
        // Only update if it's a different section and has significant visibility
        if (newSection !== activeSection.current && mostVisible.intersectionRatio > 0.2) {
          activeSection.current = newSection;
          callback(newSection);
        }
      }
    }, options);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback, options]);
}