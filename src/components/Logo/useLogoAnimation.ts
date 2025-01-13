import { useState, useEffect } from 'react';

export function useLogoAnimation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Short delay before showing initial animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Auto-collapse after initial animation
    const collapseTimer = setTimeout(() => {
      setIsCollapsed(true);
    }, 3000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  const handleMouseEnter = () => setIsCollapsed(false);
  const handleMouseLeave = () => setIsCollapsed(true);

  return {
    isCollapsed,
    isLoaded,
    handleMouseEnter,
    handleMouseLeave
  };
}