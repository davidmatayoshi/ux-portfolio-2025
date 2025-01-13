import React from 'react';
import { useSpring, animated } from '@react-spring/web';

interface LogoLetterProps {
  letter: string;
  index: number;
  totalLetters: number;
  isLoaded: boolean;
  isCollapsed: boolean;
}

export default function LogoLetter({ 
  letter, 
  index, 
  totalLetters,
  isLoaded,
  isCollapsed 
}: LogoLetterProps) {
  const springConfig = {
    tension: 300,
    friction: 30
  };

  const spring = useSpring({
    to: {
      opacity: isLoaded && (!isCollapsed || (isCollapsed && index === 0)) ? 1 : 0,
      width: isLoaded && (!isCollapsed || (isCollapsed && index === 0)) ? 20 : 0,
      x: isLoaded && (!isCollapsed || (isCollapsed && index === 0)) ? 0 : -20,
    },
    delay: isCollapsed 
      ? (totalLetters - index - 1) * 50  // Reverse order for collapse
      : index * 50,                      // Sequential order for expand
    config: springConfig
  });

  return (
    <animated.span
      style={{
        ...spring,
        display: 'inline-block',
        marginRight: letter === '\u00A0' ? '0.5em' : '0.1em', // Add slight spacing between letters
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      {letter}
    </animated.span>
  );
}